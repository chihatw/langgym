'use client';
import AudioSlider from '@/features/audioSlider/components/AudioSlider';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useState } from 'react';
import { Article, ArticleMark, Sentence } from '../../schema';
import { downloadAudioFile } from '../../services/client';
import { getYMDFromDateString } from '../../services/utils';
import SentenceRow from './SentenceRow';

type Props = {
  article: Article;
  sentences: Sentence[];
  articleMarks: ArticleMark[];
};

const ArticlePane = ({ article, sentences, articleMarks }: Props) => {
  const { year, month, day } = getYMDFromDateString(article.date);
  const [value, setValue] = useState<{
    audioBuffer: AudioBuffer | null;
  }>({ audioBuffer: null });

  useEffect(() => {
    if (!article.audioPath) return;
    (async () => {
      const blob = await downloadAudioFile(article.audioPath);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;

      setValue((prev) => ({ ...prev, audioBuffer }));
    })();
  }, [article]);

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <div className='text-2xl font-extrabold'>{article.title}</div>
        <div className='text-xs font-extralight'>{`${year}年${month}月${day}日`}</div>
        {value.audioBuffer && articleMarks.at(0) && articleMarks.at(-1) ? (
          <AudioSlider
            start={articleMarks.at(0)!.start}
            end={articleMarks.at(-1)!.end}
            audioBuffer={value.audioBuffer}
          />
        ) : null}
      </div>
      <div className='space-y-4'>
        {sentences?.map((sentence, index) => (
          <SentenceRow
            key={index}
            sentence={sentence}
            index={index}
            isShowAccents={article.isShowAccents}
            articleMark={articleMarks.at(index)}
            audioBuffer={value.audioBuffer}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlePane;

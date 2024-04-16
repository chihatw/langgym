'use client';
import AudioSlider from '@/components/AudioSlider';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useState } from 'react';
import {
  Article,
  ArticleMark,
  ArticleRecordedAssignment,
  Sentence,
} from '../../schema';
import { downloadAudioFile } from '../../services/client';
import { getYMDFromDateString } from '../../services/utils';
import SentenceRow from './SentenceRow';

type Props = {
  article: Article;
  sentences: Sentence[];
  articleMarks: ArticleMark[];
  articleRecordedAssignments: ArticleRecordedAssignment[];
};

type FormProps = {
  audioBuffer: AudioBuffer | null;
  assignmentAudioBuffers: AudioBuffer[];
};

const INITIAL_STATE: FormProps = {
  audioBuffer: null,
  assignmentAudioBuffers: [],
};

const ArticlePane = ({
  article,
  sentences,
  articleMarks,
  articleRecordedAssignments,
}: Props) => {
  const { year, month, day } = getYMDFromDateString(article.date);
  const [value, setValue] = useState(INITIAL_STATE);

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
        {article.isShowAccents &&
        value.audioBuffer &&
        articleMarks.at(0) &&
        articleMarks.at(-1) ? (
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
            line={index}
            index={index}
            sentence={sentence}
            articleId={article.id}
            audioBuffer={value.audioBuffer}
            articleMark={articleMarks.at(index)}
            isShowAccents={article.isShowAccents}
            articleRecordedAssignment={articleRecordedAssignments.find(
              (item) => item.line === index
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlePane;

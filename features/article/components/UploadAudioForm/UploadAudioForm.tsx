'use client';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useState } from 'react';
import { Article, ArticleMark, Sentence } from '../../schema';
import { downloadAudioFile } from '../../services/client';
import ArticleMarksForm from './ArtilceMarksForm';
import DeleteAudioInput from './DeleteAudioInput';
import UploadAudioInput from './UploadAudioInput';

type Props = {
  article: Article;
  sentences: Sentence[];
  marks: ArticleMark[];
};

export type UploadAudioFormProps = {
  audioBuffer: null | AudioBuffer;
  errMsg: string;
};

const INITIAL_STATE: UploadAudioFormProps = {
  audioBuffer: null,
  errMsg: '',
};

const UploadAudioForm = ({ article, sentences, marks }: Props) => {
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
    <div className='space-y-4'>
      {value.audioBuffer ? (
        <ArticleMarksForm
          articleId={article.id}
          sentences={sentences}
          audioBuffer={value.audioBuffer}
          articleMarks={marks}
        />
      ) : null}
      {article.audioPath ? (
        <DeleteAudioInput articleId={article.id} setValue={setValue} />
      ) : (
        <UploadAudioInput article={article} value={value} setValue={setValue} />
      )}
    </div>
  );
};

export default UploadAudioForm;

'use client';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { SentenceView } from '../../schema';
import { downloadAudioFile } from '../../services/client';
import ArticleMarksForm from './ArtilceMarksForm';
import DeleteAudioInput from './DeleteAudioInput';
import UploadAudioInput from './UploadAudioInput';

type Props = {
  sentences: SentenceView[];
};

export type UploadAudioFormProps = {
  audioBuffer: null | AudioBuffer;
  errMsg: string;
};

const INITIAL_STATE: UploadAudioFormProps = {
  audioBuffer: null,
  errMsg: '',
};

const UploadAudioForm = ({ sentences }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const sentence = useMemo(() => sentences.at(0), [sentences]);

  useEffect(() => {
    if (!sentence) return;

    const { audioPath } = sentence;

    if (!audioPath) return;
    (async () => {
      const blob = await downloadAudioFile(audioPath);
      if (!blob) return;
      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;
      setValue((prev) => ({ ...prev, audioBuffer }));
    })();
  }, [sentence]);

  if (!sentence) return <></>;
  const { audioPath, articleId } = sentence;
  if (articleId === null) return <></>;

  return (
    <div className='space-y-4'>
      {value.audioBuffer ? (
        <ArticleMarksForm
          audioBuffer={value.audioBuffer}
          sentences={sentences}
        />
      ) : null}
      {audioPath ? (
        <DeleteAudioInput articleId={articleId!} setValue={setValue} />
      ) : (
        <UploadAudioInput
          value={value}
          setValue={setValue}
          articleId={articleId}
        />
      )}
    </div>
  );
};

export default UploadAudioForm;

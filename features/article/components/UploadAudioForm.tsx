'use client';
import { Button } from '@/components/ui/button';
import { blobToAudioBuffer } from '@/utils';
import { Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Article, Sentence } from '../schema';
import { downloadAudioFile } from '../services/client';
import DeleteAudioInput from './DeleteAudioInput';
import UploadAudioInput from './UploadAudioInput';

type Props = {
  article: Article;
  sentences: Sentence[];
};

export type UploadAudioFormProps = {
  audioBuffer: null | AudioBuffer;
  errMsg: string;
};

const INITIAL_STATE: UploadAudioFormProps = {
  audioBuffer: null,
  errMsg: '',
};

const UploadAudioForm = ({ article, sentences }: Props) => {
  const audioContext = useMemo(() => new AudioContext(), []);
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

  const playAudio = () => {
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = value.audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.start();
  };

  return (
    <div className='space-y-4'>
      {value.audioBuffer ? (
        <div className='space-y-4'>
          <div className='bg-white rounded text-4xl flex items-center justify-center h-32'>
            wave
          </div>
          <Button size={'icon'} onClick={playAudio} className='w-full'>
            <Play />
          </Button>
        </div>
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

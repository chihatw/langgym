import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { Play } from 'lucide-react';
import { useMemo } from 'react';
import { SentenceView } from '../../schema';

type Props = {
  sentences: SentenceView[];
  audioBuffer: AudioBuffer;
};

const ArticleMarksMonitor = ({ sentences, audioBuffer }: Props) => {
  return (
    <div className='space-y-4'>
      {sentences.map((sentence, index) => (
        <ArticleMarkMonitorRow
          key={index}
          sentence={sentence}
          audioBuffer={audioBuffer}
        />
      ))}
    </div>
  );
};

export default ArticleMarksMonitor;

const ArticleMarkMonitorRow = ({
  sentence,
  audioBuffer,
}: {
  sentence: SentenceView;
  audioBuffer: AudioBuffer;
}) => {
  const audioContext = useMemo(() => new AudioContext(), []);

  const playHead = (start: number) => {
    const end = Math.min(audioBuffer.duration, start + 1);
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.start(0, start, end - start);
  };

  const playTail = (end: number) => {
    const start = Math.max(0, end - 1);
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.start(0, start, end - start);
  };

  const { pitchStr, start, end } = sentence;

  return (
    <div className='p-2 bg-white/60 rounded'>
      <div className='text-xs space-y-2'>
        <div>{sentence.japanese}</div>
        <SentencePitchLine pitchStr={pitchStr!} />
        <div className='flex gap-x-2 justify-end'>
          <div className='grid grid-cols-[auto,64px] items-center p-1 pr-3 rounded bg-gray-200'>
            {start !== null && end !== null ? (
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => playHead(start)}
              >
                <Play />
              </Button>
            ) : null}

            <div>{`start: ${start}`}</div>
          </div>
          <div className='grid grid-cols-[auto,64px] gap-x-2 items-center p-1 pr-3 rounded bg-gray-200'>
            {start !== null && end !== null ? (
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => playTail(end)}
              >
                <Play />
              </Button>
            ) : null}

            <div>{`end: ${end}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

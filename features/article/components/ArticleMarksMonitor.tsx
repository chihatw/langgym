import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { Play } from 'lucide-react';
import { useMemo } from 'react';
import { Sentence } from '../schema';

type Props = {
  sentences: Sentence[];
  marks: { start: number; end: number }[];
  audioBuffer: AudioBuffer;
};

const ArticleMarksMonitor = ({ sentences, marks, audioBuffer }: Props) => {
  return (
    <div className='space-y-4'>
      <div className='text-xs font-extralight text-gray-500'>{`${marks.length} / ${sentences.length}`}</div>
      {sentences.map((sentence, index) => (
        <ArticleMarkMonitorRow
          key={index}
          sentence={sentence}
          start={marks[index]?.start}
          end={marks[index]?.end}
          audioBuffer={audioBuffer}
        />
      ))}
    </div>
  );
};

export default ArticleMarksMonitor;

const ArticleMarkMonitorRow = ({
  sentence,
  start,
  end,
  audioBuffer,
}: {
  sentence: Sentence;
  start?: number;
  end?: number;
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
  return (
    <div className='p-2 bg-white/60 rounded'>
      <div className='text-xs space-y-2'>
        <div>{sentence.japanese}</div>
        <SentencePitchLine pitchStr={sentence.pitchStr} />
        <div className='flex gap-x-2 justify-end'>
          <div className='flex gap-x-2 items-center p-1 pr-3 rounded bg-gray-200'>
            {typeof start !== 'undefined' && typeof end !== 'undefined' ? (
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
          <div className='flex gap-x-2 items-center p-1 pr-3 rounded bg-gray-200'>
            {typeof start !== 'undefined' && typeof end !== 'undefined' ? (
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

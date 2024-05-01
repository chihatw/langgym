import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useEffect, useMemo, useState, useTransition } from 'react';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Slider } from '@/components/ui/slider';
import AudioWave from '@/features/wave/components/AudioWave';
import MarkLines from '@/features/wave/components/MarkLines';
import { buildMarks } from '@/features/wave/services/utils';
import { useRouter } from 'next/navigation';
import { ArticleMark, SentenceView } from '../../schema';
import { batchInsertArticleMarks } from '../../services/actions';
import ArticleMarksMonitor from './ArticleMarksMonitor';

const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 100;
const INITIAL_SILENT_DURATION = 700;

type Props = {
  sentences: SentenceView[];
  audioBuffer: AudioBuffer;
};

const ArticleMarksForm = ({ audioBuffer, sentences }: Props) => {
  const router = useRouter();
  const [marks, setMarks] = useState<{ start: number; end: number }[]>([]);
  const [silentDuration, setSilentDuration] = useState(INITIAL_SILENT_DURATION);
  const [isPending, startTransition] = useTransition();
  const audioContext = useMemo(() => new AudioContext(), []);
  const sentence = useMemo(() => sentences.at(0), [sentences]);

  useEffect(() => {
    if (sentences.every((s) => !!s.start && !!s.end)) {
      setMarks(
        sentences.map(({ start, end }) => ({ start: start!, end: end! }))
      );
      return;
    }
    const channelData = audioBuffer.getChannelData(0);

    const marks: { start: number; end: number }[] = buildMarks(
      audioBuffer,
      channelData,
      silentDuration
    );

    setMarks(marks);
  }, [audioBuffer, silentDuration, sentences]);

  // optimize stop 実装
  const playAudio = () => {
    const start = marks.at(0)?.start || 0;
    const end = marks.at(-1)?.end || audioBuffer.duration;
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.start(0, start, end - start);
  };

  const handleSlide = (value: number[]) => {
    if (!value.at(0)) return;
    setSilentDuration(value.at(0)!);
  };

  const action = async () => {
    if (!sentence) return;
    const { articleId } = sentence;
    if (!articleId) return;

    const newArticleMarks: Omit<ArticleMark, 'id' | 'created_at'>[] = marks.map(
      (mark, index) => ({ ...mark, line: index, articleId })
    );
    startTransition(async () => {
      const errMsg = await batchInsertArticleMarks(articleId, newArticleMarks);
      if (errMsg) {
        console.error(errMsg);
        return;
      }
      router.push('/');
    });
  };

  if (!sentence) return;
  const { audioPath } = sentence;

  return (
    <div className='grid gap-y-4'>
      <div
        className='relative'
        style={{ height: CANVAS_HEIGHT, width: CANVAS_WIDTH }}
      >
        <div className='absolute'>
          <AudioWave
            height={CANVAS_HEIGHT}
            width={CANVAS_WIDTH}
            audioBuffer={audioBuffer}
          />
        </div>
        <div className='absolute'>
          <MarkLines
            marks={marks}
            height={CANVAS_HEIGHT}
            width={CANVAS_WIDTH}
            duration={audioBuffer.duration}
          />
        </div>
      </div>
      <div>
        <div className='text-xs text-gray-500 '>
          <div>{silentDuration}</div>
          <div>{`${marks.length} / ${sentences.length}`}</div>
        </div>
        <Slider
          min={300}
          max={700}
          className='py-2'
          defaultValue={[silentDuration]}
          onValueChange={handleSlide}
        />
      </div>
      <Button size={'icon'} onClick={playAudio} className='w-full'>
        <Play />
      </Button>
      <ArticleMarksMonitor
        sentences={sentences}
        audioBuffer={audioBuffer}
        marks={marks}
      />
      <SubmitServerActionButton
        action={action}
        isPending={isPending}
        disabled={sentences.length !== marks.length || !audioPath}
      >
        Submit
      </SubmitServerActionButton>
    </div>
  );
};

export default ArticleMarksForm;

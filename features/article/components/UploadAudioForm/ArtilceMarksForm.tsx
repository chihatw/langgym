import { Button } from '@/components/ui/button';
import { Loader2, Play } from 'lucide-react';
import { useEffect, useMemo, useState, useTransition } from 'react';

import AudioWave from '@/features/wave/components/AudioWave';
import MarkLines from '@/features/wave/components/MarkLines';
import { buildMarks } from '@/features/wave/services/utils';
import { useRouter } from 'next/navigation';
import { ArticleMark, Sentence } from '../../schema';
import { batchInsertArticleMarks } from '../../services/actions';
import ArticleMarksMonitor from './ArticleMarksMonitor';

const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 100;
const INITIAL_SILENT_DURATION = 700;

type Props = {
  audioBuffer: AudioBuffer;
  sentences: Sentence[];
  articleId: number;
  articleMarks: ArticleMark[];
};

const ArticleMarksForm = ({
  audioBuffer,
  sentences,
  articleId,
  articleMarks,
}: Props) => {
  const router = useRouter();
  const [marks, setMarks] = useState<{ start: number; end: number }[]>([]);
  const [silentDuration, setSilentDuration] = useState(INITIAL_SILENT_DURATION); // todo add duration slider to ArticleMarksForm
  const [isPending, startTransition] = useTransition();
  const audioContext = useMemo(() => new AudioContext(), []);

  useEffect(() => {
    if (articleMarks.length) {
      setMarks(articleMarks.map(({ start, end }) => ({ start, end })));
      return;
    }
    const channelData = audioBuffer.getChannelData(0);

    const marks: { start: number; end: number }[] = buildMarks(
      audioBuffer,
      channelData,
      silentDuration
    );
    setMarks(marks);
  }, [audioBuffer, silentDuration, articleMarks]);

  const playAudio = () => {
    const start = marks.at(0)?.start || 0;
    const end = marks.at(-1)?.end || audioBuffer.duration;
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.start(0, start, end - start);
  };

  const action = async () => {
    const newArticleMarks: Omit<ArticleMark, 'id' | 'created_at'>[] = marks.map(
      (mark, index) => ({ ...mark, line: index, articleId })
    );
    startTransition(async () => {
      const errMsg = await batchInsertArticleMarks(articleId, newArticleMarks);
      if (errMsg) {
        console.log(errMsg);
        return;
      }
      router.push('/mng');
    });
  };

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
      <Button size={'icon'} onClick={playAudio} className='w-full'>
        <Play />
      </Button>
      <ArticleMarksMonitor
        sentences={sentences}
        marks={marks}
        audioBuffer={audioBuffer}
      />
      <form className='grid' action={action}>
        <Button
          type={'submit'}
          disabled={sentences.length !== marks.length || isPending}
          className='flex items-center gap-x-0.5'
        >
          Submit
          {isPending ? <Loader2 className='animate-spin' /> : null}
        </Button>
      </form>
    </div>
  );
};

export default ArticleMarksForm;

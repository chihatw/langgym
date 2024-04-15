'use client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { blobToAudioBuffer } from '@/utils';
import { Pause, Play } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [value, setValue] = useState<{
    isPlaying: boolean;
    sourceNode: null | AudioBufferSourceNode;
    elapsedTime: number;
  }>({
    isPlaying: false,
    sourceNode: null,
    elapsedTime: 0, // progress = elapsedTime / duration
  });
  const rafId = useRef(0);
  const elapledTime = useRef(0);
  const startedAt = useRef(0);
  const counter = useRef(0);
  const audioContext = useMemo(() => new AudioContext(), []);
  const start = useMemo(() => articleMarks.at(0)?.start || 0, [articleMarks]);
  const end = useMemo(() => articleMarks.at(-1)?.end || 0, [articleMarks]);

  useEffect(() => {
    if (!article.audioPath) return;
    (async () => {
      const blob = await downloadAudioFile(article.audioPath);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;

      setAudioBuffer(audioBuffer);
    })();
  }, [article]);

  const play = () => {
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);

    //　pause または最後まで再生した時の処理
    sourceNode.onended = () => {
      window.cancelAnimationFrame(rafId.current);

      // 最後まで再生した場合、経過時間をリセット
      if (value.isPlaying) {
        setValue((prev) => ({ ...prev, elapsedTime: 0, isPlaying: false }));
      }
    };

    // elapsedTime が duration の範囲外の場合は、0 に変更する
    if (value.elapsedTime < 0 || value.elapsedTime > end - start) {
      setValue((prev) => ({ ...prev, elapsedTime: 0 }));
      return;
    }
    const currentTime = audioContext.currentTime;
    sourceNode.start(currentTime, start + value.elapsedTime);
    sourceNode.stop(currentTime + (end - start) - value.elapsedTime);

    // 経過時間の起点を更新
    startedAt.current = currentTime;
    setValue((prev) => ({
      ...prev,
      sourceNode,
      isPlaying: true,
    }));

    loop();
  };

  const loop = () => {
    if (!audioContext) return;
    counter.current++;

    const currentTime = audioContext.currentTime;

    const _elapsed = elapledTime.current + currentTime - startedAt.current;
    elapledTime.current = _elapsed;
    startedAt.current = currentTime;

    if (!Boolean(counter.current % 30)) {
      console.log({ start, end, duration: end - start, _elapsed });
      setValue((prev) => ({
        ...prev,
        elapsedTime: _elapsed,
        rafId,
      }));
    }

    rafId.current = window.requestAnimationFrame(loop);
  };

  const pause = () => {
    if (!value.sourceNode) return;
    value.sourceNode.stop(0);

    setValue((prev) => ({
      ...prev,
      sourceNode: null,
      isPlaying: false,
    }));
    window.cancelAnimationFrame(rafId.current);
  };

  const handleClickPlayButton = () => {
    value.isPlaying ? pause() : play();
  };

  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <div className='text-2xl font-extrabold'>{article.title}</div>
        <div className='text-xs font-extralight'>{`${year}年${month}月${day}日`}</div>
        <div className='flex items-center'>
          <Button size='icon' variant={'ghost'} onClick={handleClickPlayButton}>
            {value.isPlaying ? <Pause /> : <Play />}
          </Button>
          <div className='flex items-center text-xs font-mono font-extralight text-gray-700 px-2'>
            <Time seconds={value.elapsedTime} />
            <span>/</span>
            <Time seconds={end - start} />
          </div>
          <Slider
            value={[Math.round((100 * value.elapsedTime) / end - start)]}
          />
        </div>
      </div>
      <div className='space-y-4'>
        {sentences?.map((sentence, index) => (
          <SentenceRow
            key={index}
            sentence={sentence}
            index={index}
            isShowAccents={article.isShowAccents}
            articleMark={articleMarks.at(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticlePane;

function Time({ seconds }: { seconds: number }) {
  seconds = seconds > 0 ? seconds : 0;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return <span>{`${mins}:${String(secs).padStart(2, '0')}`}</span>;
}

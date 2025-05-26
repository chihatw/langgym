import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Pause, Play } from 'lucide-react';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type Props = {
  start: number;
  end: number;
  audioBuffer: AudioBuffer;
};

type FormProps = {
  progress: number; // 0-100
  isPlaying: boolean;
};

type RefProps = {
  rafId: number;
  isPaused: boolean;
  startedAt: number;
  sourceNode: AudioBufferSourceNode | undefined;
  elapsedTime: number;
  elaspedTime_at_last_time: number;
};

const AudioSlider = ({ start, end, audioBuffer }: Props) => {
  const audioContext = useMemo(() => new AudioContext(), []);

  // 描画変更を伴う変数
  const [value, setValue] = useState<FormProps>({
    progress: 0,
    isPlaying: false,
  });

  // 描画に直接関係のない変数
  const ref = useRef<RefProps>({
    rafId: 0,
    isPaused: false,
    startedAt: 0,
    sourceNode: undefined,
    elapsedTime: 0,
    elaspedTime_at_last_time: 0,
  });

  // コンポーネント消滅時の処理
  useEffect(() => {
    return () => pause();
  }, []);

  const handleEnded = (
    ref: MutableRefObject<RefProps>,
    setValue: Dispatch<SetStateAction<FormProps>>
  ) => {
    // pause の場合、何もしない
    if (ref.current.isPaused) return;

    // 最後まで再生した場合、
    // アニメを止めて経過時間をリセットし、playing 状態を変更
    window.cancelAnimationFrame(ref.current.rafId);
    ref.current = {
      ...ref.current,
      elapsedTime: 0,
      elaspedTime_at_last_time: 0,
    };

    setTimeout(() => {
      setValue((prev) => ({
        ...prev,
        progress: 0,
        isPlaying: false,
      }));
    }, 500); // 余韻をもたせる
  };

  const play = () => {
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);

    //　停止処理
    sourceNode.onended = () => handleEnded(ref, setValue);

    // 再生処理
    const offset = start + ref.current.elapsedTime;
    const duration = end - start - ref.current.elapsedTime;
    sourceNode.start(0, offset, duration); // 即時再生

    // 変数更新
    ref.current = {
      ...ref.current,
      isPaused: false,
      startedAt: audioContext.currentTime,
      sourceNode,
    };

    setValue((prev) => ({
      ...prev,
      isPlaying: true,
    }));

    loop();
  };

  const loop = () => {
    // loop
    const rafId = window.requestAnimationFrame(loop);

    // 今回、play の経過時間
    const currentElapsedTime = audioContext.currentTime - ref.current.startedAt;

    // 累計経過時間（前回 pause 時までの経過時間と合計）
    const totalElapsedTime =
      currentElapsedTime + ref.current.elaspedTime_at_last_time;

    // 変数更新
    ref.current = {
      ...ref.current,
      rafId,
      elapsedTime: totalElapsedTime,
    };

    setValue((prev) => ({
      ...prev,
      progress: (totalElapsedTime / (end - start)) * 100,
    }));
  };

  const pause = () => {
    window.cancelAnimationFrame(ref.current.rafId);

    !!ref.current.sourceNode && ref.current.sourceNode.stop(0);

    // 停止時点の累計経過時間を記録する
    ref.current = {
      ...ref.current,
      isPaused: true,
      sourceNode: undefined,
      elaspedTime_at_last_time: ref.current.elapsedTime,
    };

    setValue((prev) => ({
      ...prev,
      isPlaying: false,
    }));
  };

  const handleClickPlayButton = () => {
    value.isPlaying ? pause() : play();
  };

  const handleSlide = (value: number[]) => {
    const progress = value.at(0);
    if (typeof progress === 'undefined') return;

    pause();

    ref.current = {
      ...ref.current,
      elapsedTime: ((end - start) * progress) / 100,
    };

    setValue((prev) => ({
      ...prev,
      progress,
    }));
  };
  return (
    <div className='grid grid-cols-[auto_1fr] items-center '>
      <Button size='icon' variant={'ghost'} onClick={handleClickPlayButton}>
        {value.isPlaying ? <Pause /> : <Play />}
      </Button>
      <div className='grid grid-cols-[1fr_auto] items-center rounded py-3 pl-3 bg-slate-200'>
        <Slider value={[value.progress]} onValueChange={handleSlide} />
        <div className='flex items-center text-xs font-mono  text-gray-600 px-2'>
          <Time seconds={((end - start) * value.progress) / 100} />
          <span>/</span>
          <Time seconds={end - start} />
        </div>
      </div>
    </div>
  );
};

export default AudioSlider;

const Time = ({ seconds }: { seconds: number }) => {
  const _seconds = Math.max(seconds, 0);
  const mins = Math.floor(_seconds / 60);
  const secs = Math.round(_seconds % 60);
  return <span>{`${mins}:${String(secs).padStart(2, '0')}`}</span>;
};

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Pause, Play } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

type Props = {
  start: number;
  end: number;
  audioBuffer: AudioBuffer;
};

const AudioSlider = ({ start, end, audioBuffer }: Props) => {
  const [value, setValue] = useState<{
    progress: number;
    isPlaying: boolean;
  }>({ progress: 0, isPlaying: false });

  const ref = useRef<{
    rafId: number;
    elapsedTime: number;
    startedAt: number;
    isPaused: boolean;
    sourceNode: AudioBufferSourceNode | undefined;
  }>({
    rafId: 0,
    elapsedTime: 0,
    startedAt: 0,
    isPaused: false,
    sourceNode: undefined,
  });

  const audioContext = useMemo(() => new AudioContext(), []);

  const play = () => {
    const _sourceNode = audioContext.createBufferSource();
    _sourceNode.buffer = audioBuffer;
    _sourceNode.connect(audioContext.destination);

    ref.current = { ...ref.current, sourceNode: _sourceNode };

    //　pause または最後まで再生した時の処理
    _sourceNode.onended = () => {
      window.cancelAnimationFrame(ref.current.rafId);

      // 最後まで再生した場合、経過時間をリセット
      if (!ref.current.isPaused) {
        ref.current = { ...ref.current, elapsedTime: 0 };

        setTimeout(() => {
          setValue((prev) => ({ ...prev, progress: 0, isPlaying: false }));
        }, 500);
      } else {
        setValue((prev) => ({ ...prev, isPlaying: false }));
      }
    };

    const _elapsedTime = ref.current.elapsedTime;

    // elapsedTime が duration の範囲外の場合は、0 に変更する
    if (_elapsedTime < 0 || _elapsedTime > end - start) {
      ref.current = { ...ref.current, elapsedTime: 0 };
      setTimeout(() => {
        setValue((prev) => ({ ...prev, progress: 0 }));
      }, 500);
    }

    const _currentTime = audioContext.currentTime;

    _sourceNode.start(_currentTime, start + _elapsedTime);
    _sourceNode.stop(_currentTime + (end - start) - _elapsedTime);

    // 経過時間の起点を更新
    ref.current = { ...ref.current, startedAt: _currentTime, isPaused: false };

    setValue((prev) => ({ ...prev, isPlaying: true }));

    loop();
  };

  const loop = () => {
    const _currentTime = audioContext.currentTime;
    const { elapsedTime, startedAt } = ref.current;

    // 経過時間を累積経過時間に追加
    const _newElapsedTime = elapsedTime + _currentTime - startedAt;

    setValue((prev) => ({
      ...prev,
      progress: (_newElapsedTime / (end - start)) * 100,
    }));

    const rafId = window.requestAnimationFrame(loop);

    ref.current = {
      ...ref.current,
      elapsedTime: _newElapsedTime,
      startedAt: _currentTime,
      rafId,
    };
  };

  const pause = () => {
    !!ref.current.sourceNode && ref.current.sourceNode.stop(0);

    ref.current = { ...ref.current, sourceNode: undefined, isPaused: true };

    setValue((prev) => ({ ...prev, isPlaying: false }));

    window.cancelAnimationFrame(ref.current.rafId);
  };

  const handleClickPlayButton = () => {
    value.isPlaying ? pause() : play();
  };

  const handleSlide = (value: number[]) => {
    const progress = value.at(0);
    if (typeof progress === 'undefined') return;

    pause();
    setValue((prev) => ({
      ...prev,
      progress,
    }));

    ref.current = {
      ...ref.current,
      elapsedTime: ((end - start) * progress) / 100,
    };
  };
  return (
    <div className='flex items-center'>
      <Button size='icon' variant={'ghost'} onClick={handleClickPlayButton}>
        {value.isPlaying ? <Pause /> : <Play />}
      </Button>
      <div className='flex items-center text-xs font-mono font-extralight text-gray-700 px-2'>
        <Time seconds={((end - start) * value.progress) / 100} />
        <span>/</span>
        <Time seconds={end - start} />
      </div>
      <Slider value={[value.progress]} onValueChange={handleSlide} min={0} />
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

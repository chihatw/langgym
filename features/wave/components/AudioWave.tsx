import { memo, useEffect, useMemo, useRef } from 'react';
import { buildPeaks } from '../services/utils';

type Props = {
  height: number;
  width: number;
  audioBuffer: AudioBuffer;
};

const AudioWave = memo(({ height, width, audioBuffer }: Props) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const audioContext = useMemo(() => new AudioContext(), []);

  useEffect(() => {
    const channelData = audioBuffer.getChannelData(0);
    const peaks = buildPeaks(channelData, width);

    // 波形描画
    if (!canvas.current) return;

    const context = canvas.current.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.current.width, canvas.current.height);
    peaks.forEach((peak, index) => {
      context.fillStyle = 'pink';
      const _height = height * peak;
      const y = (height / 2) * (1 - peak); // バーの開始点を半分さげる
      context.fillRect(index, y, 1, _height);
    });
  }, [audioBuffer, audioContext, height, width]);
  return (
    <div className='bg-white/60 rounded'>
      <canvas ref={canvas} height={height} width={width} />
    </div>
  );
});

export default AudioWave;

// displayName がないと怒られる
AudioWave.displayName = 'AudioWave';

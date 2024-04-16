'use client';

import { useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';

type Props = {
  start?: number;
  end?: number;
  audioBuffer: AudioBuffer;
  PlayIcon: React.ReactNode;
  PauseIcon: React.ReactNode;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  className?: string;
};

const AudioPlayButton = ({
  audioBuffer,
  PlayIcon,
  PauseIcon,
  size,
  variant,
  className,
  start = 0,
  end = audioBuffer.duration,
}: Props) => {
  const audioContext = useMemo(() => new AudioContext(), []);
  const sourceNode = useRef<AudioBufferSourceNode | undefined>(undefined);
  const [isPlayng, setIsPlaying] = useState(false);

  const play = () => {
    const _sourceNode = audioContext.createBufferSource();
    _sourceNode.buffer = audioBuffer;
    _sourceNode.connect(audioContext.destination);

    //　停止処理
    _sourceNode.onended = () => setIsPlaying(false);

    // 再生処理
    _sourceNode.start(0, start, end - start);

    // 変数更新
    sourceNode.current = _sourceNode;
    setIsPlaying(true);
  };

  const stop = () => {
    !!sourceNode.current && sourceNode.current.stop(0);
    sourceNode.current = undefined;

    setIsPlaying(false);
  };

  const handleClick = () => {
    isPlayng ? stop() : play();
  };
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleClick}
    >
      {isPlayng ? PauseIcon : PlayIcon}
    </Button>
  );
};

export default AudioPlayButton;

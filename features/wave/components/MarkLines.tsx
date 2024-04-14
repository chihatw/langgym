import { memo, useEffect, useRef } from 'react';
import { buildMarkLines } from '../services/utils';

type Props = {
  marks: { start: number; end: number }[];
  height: number;
  width: number;
  duration: number;
};

const MarkLines = memo(({ height, width, duration, marks }: Props) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 波形描画
    if (!canvas.current) return;
    const markLines = buildMarkLines(marks, duration, canvas.current.width);

    const context = canvas.current.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.current.width, canvas.current.height);
    markLines.forEach((markLine) => {
      context.fillStyle = markLine.color;
      context.fillRect(markLine.xPos, 0, 1, canvas.current!.height);
    });
  }, [duration, marks]);
  return <canvas ref={canvas} height={height} width={width} />;
});

MarkLines.displayName = 'MarkLines';

export default MarkLines;

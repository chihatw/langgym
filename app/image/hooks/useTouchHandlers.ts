import { getDistance } from '@/utils/getDistance';
import { useCallback, useRef, useState } from 'react';

export const useTouchHandlers = ({
  scale,
  updateScale,
}: {
  scale: number;
  updateScale: (newScale: number) => void;
}) => {
  const initialPinchScale = useRef<number | null>(null);
  const initialPinchDistance = useRef<number | null>(null);
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // --- ピンチ開始処理
  const startPinch = (touches: React.TouchList) => {
    initialPinchScale.current = scale;
    initialPinchDistance.current = getDistance(touches);
  };

  // --- ピンチ移動処理
  const movePinch = (touches: React.TouchList) => {
    if (!initialPinchScale.current || !initialPinchDistance.current) return;
    const currentDistance = getDistance(touches);
    const scaleChange = currentDistance / initialPinchDistance.current;
    const newScale = initialPinchScale.current * scaleChange;
    updateScale(newScale);
  };

  // --- パン開始処理
  const startPan = (touch: React.Touch) => {
    lastTouch.current = { x: touch.clientX, y: touch.clientY };
  };

  // --- パン移動処理
  const movePan = (touch: React.Touch) => {
    if (!lastTouch.current) return;
    const dx = touch.clientX - lastTouch.current.x;
    const dy = touch.clientY - lastTouch.current.y;
    setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastTouch.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        startPinch(e.touches);
      } else if (e.touches.length === 1) {
        startPan(e.touches[0]);
      }
    },
    [scale]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (
        e.touches.length === 2 &&
        initialPinchScale.current &&
        initialPinchDistance.current
      ) {
        movePinch(e.touches);
        e.preventDefault();
      } else if (e.touches.length === 1 && lastTouch.current) {
        movePan(e.touches[0]);
        e.preventDefault();
      }
    },
    [updateScale]
  );

  const onTouchEnd = useCallback(() => {
    initialPinchScale.current = null;
    initialPinchDistance.current = null;
    lastTouch.current = null;
  }, []);

  return { onTouchStart, onTouchMove, onTouchEnd, translate };
};

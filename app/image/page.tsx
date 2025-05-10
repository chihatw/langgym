'use client';

import { useImageUrl } from '@/hooks/useImageUrl';
import { usePinchZoomScale } from '@/hooks/usePinchZoomScale';
import { getDistance } from '@/utils/getDistance';
import Image from 'next/image';
import { useCallback, useRef } from 'react';

type Props = {};

const IMAGE_PATH = 'folder/sample.png';

const MIN_SCALE = 0.5; // 最小スケール（画面より小さくできる）
const MAX_SCALE = 3;

const ImagePage = (props: Props) => {
  const { imageUrl } = useImageUrl('image', IMAGE_PATH);

  const { scale, updateScale } = usePinchZoomScale(MIN_SCALE, MAX_SCALE);
  const initialPinchScale = useRef<number | null>(scale); // ピンチ開始時のスケール

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      initialPinchScale.current = scale; // ピンチ開始時のスケールを記録
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && initialPinchScale.current) {
        const currentDistance = getDistance(e.touches);
        const scaleChange = currentDistance / initialPinchScale.current;
        const newScale = initialPinchScale.current * scaleChange;

        updateScale(newScale);
        e.preventDefault();
      }
    },
    [scale, updateScale]
  );

  const handleTouchEnd = useCallback(() => {
    initialPinchScale.current = null;
  }, []);

  if (!imageUrl) return <div>Loading...</div>;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        touchAction: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={imageUrl}
        alt={'alt'}
        fill
        style={{
          objectFit: 'contain',
          transform: `scale(${scale})`,
          transition: 'transform 0.1s',
          userSelect: 'none',
          touchAction: 'none',
        }}
        draggable={false}
      />
    </div>
  );
};

export default ImagePage;

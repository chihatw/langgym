'use client';

import { useImageUrl } from '@/hooks/useImageUrl';
import Image from 'next/image';
import { usePinchZoomScale } from './hooks/usePinchZoomScale';
import { useTouchHandlers } from './hooks/useTouchHandlers';

type Props = {};

const IMAGE_PATH = 'folder/sample.png';

const MIN_SCALE = 0.5; // 最小スケール（画面より小さくできる）
const MAX_SCALE = 3;

const ImagePage = (props: Props) => {
  const { imageUrl } = useImageUrl('image', IMAGE_PATH);

  const { scale, updateScale } = usePinchZoomScale(MIN_SCALE, MAX_SCALE);

  const { onTouchEnd, onTouchMove, onTouchStart, translate } = useTouchHandlers(
    {
      scale,
      updateScale,
    }
  );

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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Image
        src={imageUrl}
        alt={'alt'}
        fill
        style={{
          objectFit: 'contain',
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
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

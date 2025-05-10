import { useCallback, useState } from 'react';

export const usePinchZoomScale = (minScale: number, maxScale: number) => {
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(
    (newScale: number) => {
      setScale(Math.max(minScale, Math.min(maxScale, newScale)));
    },
    [minScale, maxScale]
  );

  return { scale, updateScale };
};

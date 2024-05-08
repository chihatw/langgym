'use client';

import MngPaneContainer from '@/components/MngPaneContainer';
import { Canvas } from '../schema';
import MngCanvasForm from './MngCanvasForm';

type Props = { canvas: Canvas | undefined };

const MngCanvasFormContainer = ({ canvas }: Props) => {
  return (
    <MngPaneContainer label='Canvas'>
      <div className='grid gap-4'>
        <div className='text-2xl font-extrabold'>Canvas</div>
        <MngCanvasForm canvas={canvas} />
      </div>
    </MngPaneContainer>
  );
};

export default MngCanvasFormContainer;

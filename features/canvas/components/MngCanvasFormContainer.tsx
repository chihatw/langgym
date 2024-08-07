'use client';
import MngPaneContainer from '@/components/MngPaneContainer';
import MngCanvasForm from './MngCanvasForm/MngCanvasForm';

type Props = {};

const MngCanvasFormContainer = ({}: Props) => {
  return (
    <MngPaneContainer label='Canvas'>
      <div className='grid gap-4'>
        <div className='text-2xl font-extrabold'>Canvas</div>
        <MngCanvasForm />
      </div>
    </MngPaneContainer>
  );
};

export default MngCanvasFormContainer;

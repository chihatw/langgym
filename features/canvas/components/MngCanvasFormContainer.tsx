'use client';
import MngPaneContainer from '@/components/MngPaneContainer';
import { Button } from '@/components/ui/button';
import {
  updateBackToHomeTrigger,
  updateRedirectToRealtimeCanvasTrigger,
  updateRedirectToRealtimeTrigger,
  updateRefreshRealtimeTrigger,
} from '@/features/trigger/services/client';
import MngCanvasForm from './MngCanvasForm/MngCanvasForm';

type Props = {};

const MngCanvasFormContainer = ({}: Props) => {
  return (
    <MngPaneContainer label='Canvas' open>
      <div className='grid gap-4'>
        <div className='text-2xl font-extrabold'>Canvas</div>
        <div className='flex gap-4 flex-wrap'>
          <Button
            variant={'ghost'}
            className='p-0 h-auto'
            onClick={updateRedirectToRealtimeCanvasTrigger}
          >
            Redirect to Realtime Canvas
          </Button>
          <Button
            variant={'ghost'}
            className='p-0 h-auto'
            onClick={updateRedirectToRealtimeTrigger}
          >
            Redirect to Realtime
          </Button>
          <Button
            variant={'ghost'}
            className='p-0 h-auto'
            onClick={updateRefreshRealtimeTrigger}
          >
            Refresh Realtime
          </Button>
          <Button
            variant={'ghost'}
            className='p-0 h-auto'
            onClick={updateBackToHomeTrigger}
          >
            Back to Home
          </Button>
        </div>
        <MngCanvasForm />
      </div>
    </MngPaneContainer>
  );
};

export default MngCanvasFormContainer;

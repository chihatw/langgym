'use client';
import { Button } from '@/components/ui/button';
import MirrorWorkoutExplain_1 from './MirrorWorkoutExplain_1';
import MirrorWorkoutExplain_2 from './MirrorWorkoutExplain_2';
import MirrorWorkoutExplain_3 from './MirrorWorkoutExplain_3';
import MirrorWorkoutExplain_4 from './MirrorWorkoutExplain_4';
type Props = {
  handleSetState: () => void;
};

const MirrorWorkoutExplainContent = ({ handleSetState }: Props) => {
  return (
    <div className='grid gap-16'>
      <div className='grid gap-4'>
        <MirrorWorkoutExplain_1 />
        <MirrorWorkoutExplain_2 />
        <MirrorWorkoutExplain_3 />
        <MirrorWorkoutExplain_4 />
      </div>
      <Button onClick={handleSetState}>開始練習</Button>
    </div>
  );
};

export default MirrorWorkoutExplainContent;

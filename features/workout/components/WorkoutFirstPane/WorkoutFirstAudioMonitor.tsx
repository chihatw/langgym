import AudioSlider from '@/components/AudioSlider';
import { Button } from '@/components/ui/button';
import { deleteAudioFile } from '@/features/article/services/client';
import { Trash2 } from 'lucide-react';
import { useOptimistic } from 'react';
import { deleteWorkoutFirstAudioPathByItemId } from '../../services/actions';

type Props = {
  itemId: number;
  audioBuffer: AudioBuffer;
};

const WorkoutFirstAudioMonitor = ({ itemId, audioBuffer }: Props) => {
  const [optiAudioBuffer, remove] = useOptimistic<
    AudioBuffer | undefined,
    void
  >(audioBuffer, () => undefined);

  const action = async () => {
    // local state
    remove();

    // delete storage
    const errMsg = await deleteAudioFile(`workout/10001/${itemId}.mp3`);
    if (errMsg) {
      console.error(errMsg);
      return;
    }
    // remote state
    await deleteWorkoutFirstAudioPathByItemId(itemId);
  };

  if (!optiAudioBuffer) return <></>;

  return (
    <div className='grid grid-cols-[1fr,auto] items-center'>
      <AudioSlider
        start={0}
        end={optiAudioBuffer.duration}
        audioBuffer={optiAudioBuffer}
      />
      <form action={action}>
        <Button size='icon' variant={'ghost'} type='submit'>
          <Trash2 />
        </Button>
      </form>
    </div>
  );
};

export default WorkoutFirstAudioMonitor;

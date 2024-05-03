'use client';

import AudioSlider from '@/components/AudioSlider';
import { Button } from '@/components/ui/button';
import { CassetteTape, Trash2 } from 'lucide-react';
import { useOptimistic } from 'react';
import { deleteArticleRecordedAssignment } from '../../services/actions';
import { deleteAudioFile } from '../../services/client';

type Props = {
  line: number;
  articleId: number;
  audioBuffer: AudioBuffer;
  articleRecordedAssignmentId: number;
};

const AssignmentMonitor = ({
  audioBuffer,
  line,
  articleId,
  articleRecordedAssignmentId,
}: Props) => {
  const [optAudioBuffer, remove] = useOptimistic<AudioBuffer | null, void>(
    audioBuffer,
    (state) => null
  );
  const action = async () => {
    const path = `assignments/${articleId}/${line}.mp3`;

    // local state
    remove();

    // delete storage
    const errMsg = await deleteAudioFile(path);
    if (errMsg) {
      console.error(errMsg);
      return;
    }

    // remote state
    const _errMsg = await deleteArticleRecordedAssignment(
      articleId,
      articleRecordedAssignmentId
    );
    if (_errMsg) {
      console.error(_errMsg);
      return;
    }
  };

  if (!optAudioBuffer) return null;

  return (
    <div>
      <div className='flex pt-3 pb-2'>
        <div className='-ml-2 text-[11px] px-4 py-0.5 bg-slate-200 rounded flex items-center gap-x-1 '>
          <CassetteTape className='w-3 h-3' />
        </div>
      </div>
      <div className='grid grid-cols-[1fr,auto] items-center'>
        <AudioSlider
          start={0}
          end={optAudioBuffer.duration}
          audioBuffer={optAudioBuffer}
        />
        <form action={action}>
          <Button size='icon' variant={'ghost'} type='submit'>
            <Trash2 />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentMonitor;

'use client';

import AudioSlider from '@/components/AudioSlider';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  deleteAudioFile,
  downloadAudioFile,
} from '@/features/article/services/client';
import { cn } from '@/lib/utils';
import { blobToAudioBuffer } from '@/utils';
import { Check, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { WorkoutSecondAudioPath } from '../../schema';
import { deleteWorkoutSecondAudioPath } from '../../services/actions';

type Props = {
  href: string;
  label?: string;
  audioPath?: WorkoutSecondAudioPath;
};

const WorkoutSecondTopRow = ({ href, label, audioPath }: Props) => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    if (!audioPath || !audioPath.path) {
      setAudioBuffer(null);
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(audioPath.path);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      setAudioBuffer(audioBuffer);
    })();
  }, [audioPath]);

  const action = async () => {
    // storage
    const errMsg = await deleteAudioFile(audioPath!.path);
    if (errMsg) {
      console.log(errMsg);
      return;
    }

    // local
    setAudioBuffer(null);

    // remote
    await deleteWorkoutSecondAudioPath(audioPath!.id);
  };

  return (
    <div className='rounded bg-white/60 grid py-5 px-2 gap-4'>
      <Link href={href} className={cn(buttonVariants({ variant: 'link' }))}>
        <div className='flex gap-1 items-center justify-center'>
          <span className='font-extrabold text-2xl text-slate-700'>
            {label}
          </span>
          {audioBuffer ? <Check className='text-teal-600' /> : null}
        </div>
      </Link>
      {audioBuffer ? (
        <div className='grid grid-cols-[1fr,auto] gap-1'>
          <AudioSlider
            audioBuffer={audioBuffer}
            start={0}
            end={audioBuffer.duration}
          />
          <form action={action}>
            <Button variant={'ghost'} size='icon'>
              <Trash2 />
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default WorkoutSecondTopRow;

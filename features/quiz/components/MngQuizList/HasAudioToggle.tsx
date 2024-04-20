'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Volume2, VolumeX } from 'lucide-react';

import { useOptimistic } from 'react';
import { updateQuizHasAudio } from '../../services/actions';

type Props = { hasAudio: boolean; quizId: number };

const HasAudioToggle = ({ hasAudio, quizId }: Props) => {
  const [optiHasAudio, toggle] = useOptimistic<boolean, void>(
    hasAudio,
    (state) => !state
  );

  const action = async () => {
    toggle();
    updateQuizHasAudio(quizId, !hasAudio);
  };
  return (
    <SubmitServerActionButton size={'icon'} variant={'ghost'} action={action}>
      {optiHasAudio ? <Volume2 /> : <VolumeX />}
    </SubmitServerActionButton>
  );
};

export default HasAudioToggle;

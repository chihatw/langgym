'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Eye, EyeOff } from 'lucide-react';
import { useOptimistic } from 'react';
import { updateQuizIsDev } from '../../services/actions';

type Props = { isDev: boolean; quizId: number };

const IsDevToggle = ({ isDev, quizId }: Props) => {
  const [optiIsDev, toggle] = useOptimistic<boolean, void>(
    isDev,
    (state) => !state
  );

  const action = async () => {
    toggle();
    updateQuizIsDev(quizId, !isDev);
  };

  return (
    <SubmitServerActionButton size={'icon'} variant={'ghost'} action={action}>
      {optiIsDev ? <EyeOff /> : <Eye />}
    </SubmitServerActionButton>
  );
};

export default IsDevToggle;

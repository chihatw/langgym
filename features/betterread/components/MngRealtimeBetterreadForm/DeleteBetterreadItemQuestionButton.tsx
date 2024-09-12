'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { BetterReadItemView } from '../../schema';
import { deleteBetterreadItemQuestion } from '../../services/actions';

type Props = {
  betterreadItem: BetterReadItemView;
  handleDeleteQuestion: (question_id: number) => void;
};

const DeleteBetterreadItemQuestionButton = ({
  betterreadItem,
  handleDeleteQuestion,
}: Props) => {
  const action = async () => {
    // remote
    deleteBetterreadItemQuestion(
      betterreadItem.question_id!,
      betterreadItem.betterread_id!
    );
    // local
    handleDeleteQuestion(betterreadItem.question_id!);
  };
  return (
    <form action={action}>
      <Button size='icon' variant={'ghost'} type='submit'>
        <Trash2 />
      </Button>
    </form>
  );
};

export default DeleteBetterreadItemQuestionButton;

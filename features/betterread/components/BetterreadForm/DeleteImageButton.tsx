'use client';
import { Button } from '@/components/ui/button';
import { deleteImageFile } from '@/features/storage/services/client';
import { X } from 'lucide-react';

type Props = {
  path: string;
  resetValue: () => void;
  handleDelete: () => void;
};

const DeleteImageButton = ({ path, resetValue, handleDelete }: Props) => {
  const action = async () => {
    // storage
    const errMsg = await deleteImageFile(path);
    if (errMsg) {
      console.error(errMsg);
    }

    // local
    resetValue();

    // remote
    handleDelete();
  };
  return (
    <form action={action}>
      <Button
        size='icon'
        type='submit'
        variant={'ghost'}
        className='absolute right-2 top-2 bg-white text-red-500'
      >
        <X />
      </Button>
    </form>
  );
};

export default DeleteImageButton;

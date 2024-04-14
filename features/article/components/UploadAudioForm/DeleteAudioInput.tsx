'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { updateArticleAudioPath } from '../../services/actions';
import { deleteAudioFile } from '../../services/client';
import { UploadAudioFormProps } from './UploadAudioForm';

type Props = {
  articleId: number;
  setValue: Dispatch<SetStateAction<UploadAudioFormProps>>;
};

const DeleteAudioInput = ({ articleId, setValue }: Props) => {
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    const path = `articles/${articleId}.mp3`;

    startTransition(async () => {
      // update local value
      setValue((prev) => ({ ...prev, audioBuffer: null }));

      // delete storage
      const errMsg = await deleteAudioFile(path);
      if (errMsg) {
        console.log(errMsg);
        return;
      }

      // update remote Article
      const _errMsg = await updateArticleAudioPath(articleId, '');
      if (_errMsg) {
        console.log(_errMsg);
        return;
      }
    });
  };
  return (
    <form className='grid' action={action}>
      <Button
        type='submit'
        disabled={isPending}
        className='flex items-center gap-x-0.5 bg-red-500'
      >
        Delete Audio File
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
    </form>
  );
};

export default DeleteAudioInput;

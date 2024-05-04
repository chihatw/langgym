'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { deleteAudioFile } from '@/features/storage/services/client';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { updateArticleAudioPath } from '../../services/actions';
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
        console.error(errMsg);
        return;
      }

      // update remote Article
      const _errMsg = await updateArticleAudioPath(articleId, '');
      if (_errMsg) {
        console.error(_errMsg);
        return;
      }
    });
  };
  return (
    <SubmitServerActionButton
      action={action}
      isPending={isPending}
      className='bg-red-500'
    >
      Delete Audio File
    </SubmitServerActionButton>
  );
};

export default DeleteAudioInput;

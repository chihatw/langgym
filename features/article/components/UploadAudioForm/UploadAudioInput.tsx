'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import { blobToAudioBuffer } from '@/utils';
import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { Article } from '../../schema';
import { updateArticleAudioPath } from '../../services/actions';
import { uploadAudioFile } from '../../services/client';
import { UploadAudioFormProps } from './UploadAudioForm';

type Props = {
  article: Article;
  value: UploadAudioFormProps;
  setValue: Dispatch<SetStateAction<UploadAudioFormProps>>;
};

const UploadAudioInput = ({ article, value, setValue }: Props) => {
  const [file, setFile] = useState<null | File>(null);
  const [isPending, startTransition] = useTransition();

  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      setFile(null);
      setValue((prev) => ({
        ...prev,
        audioBuffer: null,
        errMsg: '',
      }));
      return;
    }

    const file = e.target.files[0];

    setFile(file);

    const reader = new FileReader();
    reader.onload = async () => {
      const response = await fetch(reader.result as string);
      const blob = await response.blob();
      const audioBuffer = await blobToAudioBuffer(blob);
      setValue((prev) => ({
        ...prev,
        audioBuffer,
        errMsg: '',
      }));
    };
    reader.readAsDataURL(file);
  };

  const action = async () => {
    const path = `articles/${article.id}.mp3`;
    startTransition(async () => {
      const errMsg = await uploadAudioFile(file!, path);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      const _errMsg = await updateArticleAudioPath(article.id, path);
      if (_errMsg) {
        setValue((prev) => ({ ...prev, errMsg: _errMsg }));
        return;
      }
    });
  };
  return (
    <div className='grid gap-y-4'>
      <Input name='audio' type='file' onChange={handleSelectFile} />
      <SubmitServerActionButton
        action={action}
        isPending={isPending}
        disabled={!value.audioBuffer}
        errMsg={value.errMsg}
      >
        Upload File
      </SubmitServerActionButton>
    </div>
  );
};

export default UploadAudioInput;

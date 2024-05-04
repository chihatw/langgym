'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  deleteImageFile,
  getImageUrl,
} from '@/features/storage/services/client';
import { BetterReadImagePathView } from '../../schema';
import { deleteBetterreadImagePath } from '../../services/client';
import UploadForm from './UploadForm';

type Props = {
  imagePath: BetterReadImagePathView;
};

type FormProps = {
  imageSrc: string;
  fileType: string;
};

const INITIAL_STATE: FormProps = {
  imageSrc: '',
  fileType: '',
};

const ImagePane = ({ imagePath }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!imagePath.imagePath) {
      setValue((prev) => ({ ...prev, imageSrc: '', storagePath: '' }));
      return;
    }

    (async () => {
      const url = await getImageUrl(imagePath.imagePath!);
      const fileType = url.split('?').at(0)!.split('.').at(-1)!;
      setValue((prev) => ({
        ...prev,
        imageSrc: url,
        fileType,
      }));
    })();
  }, [imagePath]);

  const handleRemove = async () => {
    const path = `${imagePath.betterreadId}/${imagePath.index}.${value.fileType}`;

    // storage
    const errMsg = await deleteImageFile(path);
    if (errMsg) {
      console.error(errMsg);
    }

    // local
    setValue((prev) => ({ ...prev, imageSrc: '', fileType: '' }));

    // remote
    deleteBetterreadImagePath(imagePath.betterreadId!, imagePath.index!);
  };

  return (
    <div className='grid relative'>
      {value.imageSrc ? (
        <>
          <Image
            src={value.imageSrc}
            alt=''
            className='rounded-lg'
            width={512}
            height={512}
            sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
          />

          <Button
            onClick={handleRemove}
            size='icon'
            variant={'ghost'}
            className='absolute right-2 top-2 bg-white text-red-500'
          >
            <X />
          </Button>
        </>
      ) : (
        <UploadForm imagePath={imagePath} />
      )}
    </div>
  );
};

export default ImagePane;

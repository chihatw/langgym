'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';

import { deleteImageFile } from '@/features/storage/services/client';
import { BetterReadImagePathView } from '../../schema';
import { deleteBetterreadImagePath } from '../../services/actions';
import UploadForm from './UploadForm';

type Props = {
  imagePath: BetterReadImagePathView;
};

const ImagePane = ({ imagePath }: Props) => {
  const action = async () => {
    const fileType = imagePath.imageUrl!.split('?').at(0)!.split('.').at(-1)!;
    const path = `${imagePath.betterreadId}/${imagePath.index}.${fileType}`;

    // storage
    const errMsg = await deleteImageFile(path);
    if (errMsg) {
      console.error(errMsg);
    }

    // remote
    deleteBetterreadImagePath(imagePath.betterreadId!, imagePath.index!);
  };

  return (
    <div className='grid relative'>
      {imagePath.imageUrl ? (
        <>
          <Image
            src={imagePath.imageUrl}
            alt=''
            className='rounded-lg'
            width={512}
            height={512}
            sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
          />

          <form action={action}>
            <Button
              type='submit'
              size='icon'
              variant={'ghost'}
              className='absolute right-2 top-2 bg-white text-red-500'
            >
              <X />
            </Button>
          </form>
        </>
      ) : (
        <UploadForm imagePath={imagePath} />
      )}
    </div>
  );
};

export default ImagePane;

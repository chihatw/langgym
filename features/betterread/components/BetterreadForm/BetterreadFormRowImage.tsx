'use client';

import { Button } from '@/components/ui/button';
import { deleteImageFile } from '@/features/storage/services/client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { BetterReadItem } from '../../schema';
import { deleteBetterreadItem } from '../../services/actions';

type Props = { betterreadItem: BetterReadItem; isView?: boolean };

const BetterreadFormRowImage = ({ betterreadItem, isView }: Props) => {
  const action = async () => {
    const temp = betterreadItem.image_url.split('/');
    const path = `${temp.at(-1)}`;

    // storage
    const errMsg = await deleteImageFile(path);
    if (errMsg) {
      console.error(errMsg);
      return;
    }

    // remote
    deleteBetterreadItem(betterreadItem.id, betterreadItem.betterread_id);
  };

  return (
    <div className='grid relative'>
      <Image
        src={betterreadItem.image_url}
        alt=''
        className='rounded-lg'
        width={512}
        height={512}
        sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
        priority={true}
      />
      {!isView ? (
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
      ) : null}
    </div>
  );
};

export default BetterreadFormRowImage;

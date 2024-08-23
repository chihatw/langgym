'use client';

import { Button } from '@/components/ui/button';
import { deletePostItItemImage } from '@/features/storage/services/client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { PostItItem } from '../schema';
import { resetPostItItemImageUrl } from '../services/actions';
import UploadPostitItemImage from './UploadPostitItemImage';

type Props = { index: number; postItItem: PostItItem };

const PostitFormWorkoutContentRow = ({ index, postItItem }: Props) => {
  const action = async () => {
    if (!postItItem.image_url) return;
    const temp = postItItem.image_url.split('/');
    const path = `${temp.at(-2)}/${temp.at(-1)}`;

    // storage
    const errMsg = await deletePostItItemImage(path);
    if (errMsg) {
      console.error(errMsg);
      return;
    }

    // remote
    resetPostItItemImageUrl(postItItem);
  };

  return (
    <div className='flex gap-4'>
      <div className='basis-2 text-right text-xs'>{index + 1}</div>
      <div className='flex-1 space-y-2'>
        <div className='text-sm font-extrabold'>
          <div className='grid'>
            {postItItem.japanese.split('\n').map((line, index) => {
              console.log(line);
              return <div key={index}>{line}</div>;
            })}
          </div>
        </div>

        <div className='grid gap-2 rounded-lg bg-white bg-opacity-60 p-3'>
          <div className='grid relative'>
            {postItItem.image_url ? (
              <>
                <Image
                  src={postItItem.image_url}
                  alt=''
                  className='rounded-lg'
                  width={512}
                  height={512}
                  sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
                  priority={true}
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
              <UploadPostitItemImage postItItem={postItItem} index={index} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostitFormWorkoutContentRow;

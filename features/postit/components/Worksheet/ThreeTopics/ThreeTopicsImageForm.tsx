'use client';

import { Button } from '@/components/ui/button';
import { PostItWorkout } from '@/features/postit/schema';
import { updatePostItWorkoutThreeTopicsImageUrls } from '@/features/postit/services/actions';
import { deleteImageFile } from '@/features/storage/services/client';
import { X } from 'lucide-react';
import Image from 'next/image';

type Props = { index: number; workout: PostItWorkout; url: string };

const ThreeTopicsImageForm = ({ index, workout, url }: Props) => {
  const action = async () => {
    const temp = url.split('/');
    const path = `${temp.at(-2)}/${temp.at(-1)}`;

    // storage
    const errMsg = await deleteImageFile(path);
    if (errMsg) {
      console.error(errMsg);
      return;
    }

    // remote
    const newThree_topics_image_urls = workout.three_topics_image_urls.map(
      (url, _index) => (index === _index ? '' : url)
    );
    updatePostItWorkoutThreeTopicsImageUrls(
      workout.id,
      newThree_topics_image_urls
    );
  };

  return (
    <div className='grid relative rounded-lg overflow-hidden'>
      <Image
        src={url}
        alt=''
        className={`three topics image ${index}`}
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
    </div>
  );
};

export default ThreeTopicsImageForm;

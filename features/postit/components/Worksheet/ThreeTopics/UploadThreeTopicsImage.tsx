'use client';

import { PostItWorkout } from '@/features/postit/schema';
import { revalidatePostitWorkout } from '@/features/postit/services/actions';
import { updatePostItWorkoutThreeTopicsImageUrls } from '@/features/postit/services/client';
import { uploadImageFile } from '@/features/storage/services/client';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

const SwitchInput = dynamic(
  () => import('@/components/SwitchInput').then((mod) => mod.SwitchInput),
  { ssr: false }
);

type Props = { index: number; workout: PostItWorkout; disabled: boolean };

type FormProps = {
  imageUrl: string;
};

const INITIAL_STATE: FormProps = {
  imageUrl: '',
};

const UploadThreeTopicsImage = ({ workout, index, disabled }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const form = useRef<HTMLFormElement>(null);

  // insert は client で行って、 revalidatePath だけ server action を呼ぶ
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      setValue(INITIAL_STATE);
      return;
    }
    const file = files[0];
    const type = file.name.split('.').at(-1);
    const today = new Date();

    const path = `${
      today.toISOString().split('T')[0] // 2011-10-05T14:48:00.000Z -> 2011-10-05
    }/${index}_${nanoid(6)}.${type}`;

    // storage
    const imageUrl = await uploadImageFile(file, path);

    // local
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (e) => {
      const { result } = e.target!;
      setValue({ imageUrl: result as string });
    });

    // remote (revalidatePath は server action で行う)
    const newThree_topics_image_urls = new Array(3)
      .fill('')
      .map((_, _index) =>
        index !== _index
          ? workout.three_topics_image_urls.at(_index) || ''
          : imageUrl
      );

    // debug
    console.log(newThree_topics_image_urls);

    await updatePostItWorkoutThreeTopicsImageUrls(
      workout.id,
      newThree_topics_image_urls
    );

    // server action で revalidate
    form.current!.requestSubmit();
  };

  const action = async () => {
    await revalidatePostitWorkout();
    setTimeout(() => {
      setValue(INITIAL_STATE);
    }, 2000);
  };

  return (
    <>
      {value.imageUrl ? (
        <Image
          src={value.imageUrl}
          alt=''
          className='rounded-lg'
          width={512}
          height={512}
          sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
          priority={true}
        />
      ) : null}
      {!workout.three_topics_image_urls.at(index) && !disabled ? (
        <div className='p-4 rounded-lg bg-black/10 grid gap-4'>
          <div className='pl-2 text-sm'>照片上傳</div>
          <SwitchInput handleChange={handleChange} />
          <form ref={form} action={action} />
        </div>
      ) : null}
    </>
  );
};

export default UploadThreeTopicsImage;

'use client';

import { uploadImageFile } from '@/features/storage/services/client';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { revalidateBetterread } from '../../services/actions';
import { insertBetterreadItem } from '../../services/client';

const SwitchInput = dynamic(
  () => import('@/components/SwitchInput').then((mod) => mod.SwitchInput),
  { ssr: false }
);

type Props = { betterreadId: number; showForm: boolean };

type FormProps = {
  imageUrl: string;
};

const INITIAL_STATE: FormProps = {
  imageUrl: '',
};

const UploadBetterreadImage = ({ betterreadId, showForm }: Props) => {
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

    const path = `${nanoid(6)}.${type}`;

    // storage
    const imageUrl = await uploadImageFile(file, path);

    if (!imageUrl) {
      console.error(`no image Url`);
      return;
    }

    // local
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (e) => {
      const { result } = e.target!;
      setValue({ imageUrl: result as string });
    });

    // remote (revalidatePath はしない)
    await insertBetterreadItem({
      betterread_id: betterreadId,
      image_url: imageUrl,
    });

    // server action で revalidate
    form.current!.requestSubmit();
  };

  const action = async () => {
    await revalidateBetterread(betterreadId);
    setTimeout(() => {
      setValue(INITIAL_STATE);
    }, 2000);
  };

  return (
    <>
      {value.imageUrl ? (
        <>
          <Image
            src={value.imageUrl}
            alt=''
            className='rounded-lg'
            width={512}
            height={512}
            sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
            priority={true}
          />
        </>
      ) : null}
      {showForm ? (
        <div className='p-4 rounded-lg bg-black/10 grid gap-4'>
          <div className='pl-2 text-sm'>插入照片（最多兩張）</div>
          <SwitchInput handleChange={handleChange} />
          <form ref={form} action={action} />
        </div>
      ) : null}
    </>
  );
};

export default UploadBetterreadImage;

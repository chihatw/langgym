'use client';

import { uploadPostItNoteFile } from '@/features/storage/services/client';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { PostItNoteItem } from '../schema';
import { revalidatePostitNote } from '../services/actions';
import { insertPostitNoteItem } from '../services/client';

const SwitchInput = dynamic(
  () => import('@/components/SwitchInput').then((mod) => mod.SwitchInput),
  { ssr: false }
);

type Props = { postitNoteId: number };

type FormProps = {
  imageSrc: string;
};

const INITIAL_STATE: FormProps = {
  imageSrc: '',
};

const UploadPostitNoteImage = ({ postitNoteId }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const form = useRef<HTMLFormElement>(null);

  // ファイルが選択された時
  // 本来ならば、server action にして revalidatePath をかけるべきだが、
  // handleChage に合わせて, form に値を設定して、requestSubmit をかけるのが面倒なので、
  // insert は client で行って、 revalidatePath だけ server action を呼ぶ
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      setValue(INITIAL_STATE);
      return;
    }
    const file = files[0];
    const type = file.name.split('.').at(-1);

    const path = `${postitNoteId}/${nanoid(6)}.${type}`;

    // storage
    const imageUrl = await uploadPostItNoteFile(file, path);

    if (!imageUrl) {
      console.error(`no image Url`);
      return;
    }

    // local
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (e) => {
      const { result } = e.target!;
      setValue({ imageSrc: result as string });
    });

    // remote (revalidatePath はしない)
    const postitNoteItem: Omit<PostItNoteItem, 'id' | 'created_at'> = {
      postit_note_id: postitNoteId,
      image_url: imageUrl,
    };

    await insertPostitNoteItem(postitNoteItem);

    // server action で revalidate
    form.current!.requestSubmit();
  };

  const action = async () => {
    revalidatePostitNote(postitNoteId);
  };

  if (value.imageSrc) {
    // おそらく、これが描画されるのは一瞬
    // revalidatePath をされると、PostitNoteRow コンポーネントが表示される
    return (
      <div className='relative'>
        <Image
          src={value.imageSrc}
          alt=''
          className='rounded-lg'
          width={512}
          height={512}
          sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
          priority={true}
        />
        {/* Delete ボタンは実装しない */}
        <form ref={form} action={action} />
      </div>
    );
  }

  return (
    <div className='p-4 rounded-lg bg-black/10 grid gap-4'>
      <div className='pl-2 text-sm'>插入照片</div>
      <SwitchInput handleChange={handleChange} />
    </div>
  );
};

export default UploadPostitNoteImage;

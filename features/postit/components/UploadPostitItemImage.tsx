'use client';

import { uploadPostItItemImage } from '@/features/storage/services/client';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { PostItItem } from '../schema';
import { revalidatePostitItem } from '../services/actions';
import { updatePostitItem } from '../services/client';

const SwitchInput = dynamic(
  () => import('@/components/SwitchInput').then((mod) => mod.SwitchInput),
  { ssr: false }
);

type Props = { postItItem: PostItItem; index: number };

type FormProps = {
  imageSrc: string;
};

const INITIAL_STATE: FormProps = {
  imageSrc: '',
};

const UploadPostitItemImage = ({ postItItem, index }: Props) => {
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

    const path = `${postItItem.postit_id}/${index}_${nanoid(6)}.${type}`;

    // storage
    const imageUrl = await uploadPostItItemImage(file, path);

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
    await updatePostitItem({
      ...postItItem,
      image_url: imageUrl,
    });

    // server action で revalidate
    form.current!.requestSubmit();
  };

  const action = async () => {
    revalidatePostitItem(postItItem.postit_id);
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

  return <SwitchInput handleChange={handleChange} />;
};

export default UploadPostitItemImage;

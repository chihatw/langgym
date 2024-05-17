'use client';
import { uploadImageFile } from '@/features/storage/services/client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { BetterReadImagePath, BetterReadImagePathView } from '../../schema';
import {
  deleteBetterreadImagePath,
  revalidateBetterread,
} from '../../services/actions';
import { insertBetterreadImagePath } from '../../services/client';
import DeleteImageButton from './DeleteImageButton';

// navigator 使用
const SwitchInput = dynamic(
  () => import('./SwitchInput').then((mod) => mod.SwitchInput),
  { ssr: false }
);

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

const UploadForm = ({ imagePath }: Props) => {
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

    const path = `${imagePath.betterreadId}/${imagePath.index}.${type}`;

    // storege
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
      setValue({ imageSrc: result as string, fileType: type! });
    });

    // remote (revalidatePath はしない)
    const betterreadImagePath: Omit<BetterReadImagePath, 'id' | 'created_at'> =
      {
        betterreadId: imagePath.betterreadId!,
        index: imagePath.index!,
        imageUrl,
      };
    await insertBetterreadImagePath(betterreadImagePath);

    // server action で revalidate
    form.current!.requestSubmit();
  };

  const action = async () => {
    revalidateBetterread(imagePath.betterreadId!);
  };

  if (value.imageSrc) {
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
        <DeleteImageButton
          path={`${imagePath.betterreadId}/${imagePath.index}.${value.fileType}`}
          resetValue={() => setValue(INITIAL_STATE)}
          handleDelete={() =>
            deleteBetterreadImagePath(imagePath.betterreadId!, imagePath.index!)
          }
        />

        <form ref={form} action={action} />
      </div>
    );
  }

  // form をこちらに追加すると、 null になる
  return <SwitchInput handleChange={handleChange} />;
};

export default UploadForm;

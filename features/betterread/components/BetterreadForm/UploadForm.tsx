'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { BetterReadImagePath, BetterReadImagePathView } from '../../schema';
import {
  deleteBetterreadImagePath,
  deleteImageFile,
  insertBetterreadImagePath,
  uploadImageFile,
} from '../../services/client';

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

  // ファイルが選択された時
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
    const errMsg = await uploadImageFile(file, path);

    if (errMsg) {
      console.log(errMsg);
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
        imagePath: path,
      };
    insertBetterreadImagePath(betterreadImagePath);

    // client でアップロードをして、revalidatePath はこのページが破棄される時に行う
    // useEffect の return のなかで requestSubmit() する
  };

  const handleRemove = async () => {
    const path = `${imagePath.betterreadId}/${imagePath.index}.${value.fileType}`;
    // storage
    const errMsg = await deleteImageFile(path);
    if (errMsg) {
      console.log(errMsg);
    }

    // local
    setValue(INITIAL_STATE);

    // remote (revalidatePath なし)
    deleteBetterreadImagePath(imagePath.betterreadId!, imagePath.index!);
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
        />

        <Button
          size='icon'
          variant={'ghost'}
          className='absolute right-2 top-2 bg-white text-red-500'
          onClick={handleRemove}
        >
          <X />
        </Button>
      </div>
    );
  }

  return <SwitchInput handleChange={handleChange} />;
};

export default UploadForm;

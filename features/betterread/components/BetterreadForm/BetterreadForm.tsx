'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChangeEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ANSWERS } from '../../constants';
import { BetterReadView } from '../../schema';

type Props = {
  sentences: BetterReadView[];
};

const BetterreadForm = ({ sentences }: Props) => {
  const betterread = useMemo(() => sentences.at(0), [sentences]);

  if (!betterread) return <></>;
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>課前準備</div>
      <div className='grid gap-8'>
        {sentences.map((sentence, index) => (
          <BetterreadRow key={index} index={index} sentence={sentence} />
        ))}
      </div>
    </div>
  );
};

export default BetterreadForm;

const BetterreadRow = ({
  sentence,
  index,
}: {
  sentence: BetterReadView;
  index: number;
}) => {
  if (!index) {
    return (
      <div className='flex gap-4'>
        <div className='basis-2 text-right text-xs'>{index + 1}</div>
        <div className='flex-1 space-y-2'>
          <div className='text-sm font-extrabold'>{sentence.japanese}</div>
          <div className='text-xs text-green-600'>{sentence.chinese}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex gap-4'>
      <div className='basis-2 text-right text-xs'>{index + 1}</div>
      <div className='flex-1 space-y-2'>
        <div className='text-sm font-extrabold'>{sentence.japanese}</div>
        <div className='text-xs text-green-600'>{sentence.chinese}</div>

        <div className='grid gap-2 rounded-lg bg-white bg-opacity-60 p-3'>
          <div className='text-xs font-extrabold'>🎥 分鏡</div>
          <ImagePane
            index={index}
            answer={''}
            imagePath={''}
            betterreadId={sentence.id!}
          />
        </div>
      </div>
    </div>
  );
};

const ImagePane = ({
  betterreadId,
  index,
  answer,
  imagePath,
}: {
  betterreadId: number;
  index: number;
  answer: string;
  imagePath: string;
}) => {
  const pathname = usePathname();
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (!imagePath) {
      setImageSrc('');
      return;
    }
    const fetchData = async () => {
      // try {
      //   const imageSrc = (await getDownloadURL(ref(storage, imagePath))) || '';
      //   setImageSrc(imageSrc);
      // } catch (e) {
      //   console.error(e);
      // }
    };
    fetchData();
  }, [imagePath]);

  const action = async () => {
    setImageSrc('');
    // await removeImage(user, index);
    // await removeImagePath(collections, index, pathname);
  };

  return (
    <div className='grid relative'>
      {imageSrc ? (
        <div className='relative'>
          <AnswerDisplay answer={answer || ANSWERS.no} />
          <Image
            src={imageSrc}
            alt=''
            className='rounded-lg'
            width={512}
            height={512}
            sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
          />
        </div>
      ) : (
        <UploadForm betterreadId={betterreadId} index={index} answer={answer} />
      )}

      {imageSrc ? (
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

const AnswerDisplay = ({ answer }: { answer: string }) => {
  return (
    <div
      className={`absolute font-extralight text-red-400 bg-white/70 px-2 py-1 text-sm`}
    >
      {answer}
    </div>
  );
};

// navigator 使用
const SwitchInput = dynamic(
  () => import('./SwitchInput').then((mod) => mod.SwitchInput),
  { ssr: false }
);

const UploadForm = ({
  betterreadId,
  index,
  answer,
}: {
  betterreadId: number;
  index: number;
  answer: string;
}) => {
  const pathname = usePathname();
  const form = useRef<HTMLFormElement | null>(null);
  const [imageSrc, setImageSrc] = useState('');

  // ファイルが選択された時
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // action を発火させる
    form.current!.requestSubmit();
  };

  const action = async (formData: FormData) => {
    const file = formData.get('image');
    if (!file) {
      form.current!.reset();
      setImageSrc('');
      return;
    }

    setLocalPreview(file as File, setImageSrc);

    // storage
    // await uploadImage(user, index, file as File);

    // remote
    // await setImagePath(collections, index, user, pathname);
  };

  return (
    <form className='relative' ref={form} action={action}>
      {imageSrc ? (
        <div className='relative'>
          <AnswerDisplay answer={answer} />
          <Image
            src={imageSrc}
            alt=''
            className='rounded-lg'
            width={512}
            height={512}
            sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
          />
        </div>
      ) : (
        <SwitchInput handleChange={handleChange} />
      )}
    </form>
  );
};

export const setLocalPreview = (
  file: File,
  setImageSrc: (value: SetStateAction<string>) => void
) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.addEventListener('load', (e) => {
    const { result } = e.target!;
    setImageSrc(result as string);
  });
};

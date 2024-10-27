import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

type Props = { src: string; alt: string };

const PostitWorksheetImageDialog = ({ src, alt }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt}
          width={512}
          height={512}
          className='rounded'
        />
      </DialogTrigger>
      <DialogContent className='max-w-7xl border-0 bg-transparent p-0'>
        <div className='relative h-[calc(100vh-100px)] w-full overflow-clip rounded-md bg-white '>
          <Image
            fill
            src={src}
            alt={alt}
            className='h-full w-full object-contain'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostitWorksheetImageDialog;

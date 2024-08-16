'use client';
import { Button } from '@/components/ui/button';
import { deletePostItNoteFile } from '@/features/storage/services/client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { PostItNoteItem } from '../schema';
import { deletePostItNoteItem } from '../services/actions';

type Props = {
  postitNoteItem: PostItNoteItem;
};

const PostitNoteRow = ({ postitNoteItem }: Props) => {
  const action = async () => {
    const temp = postitNoteItem.image_url.split('/');
    const path = `${temp.at(-2)}/${temp.at(-1)}`;

    // storage
    const errMsg = await deletePostItNoteFile(path);
    if (errMsg) {
      console.error(errMsg);
      return;
    }

    // remote
    deletePostItNoteItem(postitNoteItem.id, postitNoteItem.postit_note_id);
  };

  const dateStr = useMemo(() => {
    const date_tw = new Date(
      postitNoteItem.created_at.toLocaleString('en-US', {
        timeZone: 'Asia/Taipei',
      })
    );
    const y = date_tw.getFullYear();
    const m = date_tw.getMonth() + 1;
    const d = date_tw.getDate();
    return [y, m, d].join('/');
  }, [postitNoteItem]);

  return (
    <div className='grid gap-2 rounded-lg bg-white bg-opacity-60 p-3'>
      <div className='grid relative'>
        <Image
          src={postitNoteItem.image_url}
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
      </div>
      <div className='text-xs text-black/40 text-end'>{dateStr}</div>
    </div>
  );
};

export default PostitNoteRow;

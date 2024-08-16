import BorderLabel from '@/components/BorderLabel';
import Link from 'next/link';
import { fetchPostItByUid, fetchPostItNoteByUid } from '../services/server';

type Props = { uid: string };

const PostItLoader = async ({ uid }: Props) => {
  const postit = await fetchPostItByUid(uid);
  const postitNote = await fetchPostItNoteByUid(uid);

  if (!postit && !postitNote) return null;

  return (
    <div className='grid gap-4'>
      <BorderLabel label='利貼日文' />
      {postitNote ? (
        <div className='p-5 bg-white/60 rounded-lg grid gap-4'>
          <Link
            href={`/postit/note/${postitNote.id}`}
            className='hover:cursor-pointer'
          >
            <div className='grid gap-4 '>語法筆記</div>
          </Link>
        </div>
      ) : null}
      {postit ? (
        <div className='p-5 bg-white/60 rounded-lg grid gap-4'>
          <Link href={`/postit/${postit.id}`} className='hover:cursor-pointer'>
            <div className='grid gap-4 '>練習</div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default PostItLoader;

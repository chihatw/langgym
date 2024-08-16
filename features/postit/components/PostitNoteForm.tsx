import { PostItNoteItem } from '../schema';
import PostitNoteRow from './PostitNoteRow';
import UploadPostitNoteImage from './UploadPostitNoteImage';

type Props = {
  postitNoteId: number;
  postitNoteItems: PostItNoteItem[];
};

const PostitNoteForm = ({ postitNoteItems, postitNoteId }: Props) => {
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>語法筆記</div>
      <div className='grid gap-8'>
        {postitNoteItems.map((item, index) => (
          <PostitNoteRow key={index} postitNoteItem={item} />
        ))}
        <UploadPostitNoteImage postitNoteId={postitNoteId} />
      </div>
    </div>
  );
};

export default PostitNoteForm;

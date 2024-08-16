import { PostItItem } from '../schema';
import PostitFormExplainContent from './PostitFormExplainContent';
import PostitFormWorkoutContent from './PostitFormWorkoutContent';

type Props = { postItItems: PostItItem[] };

const PostitForm = ({ postItItems }: Props) => {
  return (
    <div className='grid gap-8'>
      <div className='text-2xl font-extrabold'>利貼日文練習</div>
      <PostitFormExplainContent />
      <PostitFormWorkoutContent postItItems={postItItems} />
    </div>
  );
};

export default PostitForm;

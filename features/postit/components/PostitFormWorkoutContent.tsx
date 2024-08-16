import { PostItItem } from '../schema';
import PostitFormWorkoutContentRow from './PostitFormWorkoutContentRow';

type Props = {
  postItItems: PostItItem[];
};

const PostitFormWorkoutContent = ({ postItItems }: Props) => {
  return (
    <div className='grid gap-8'>
      {postItItems.map((item, index) => (
        <PostitFormWorkoutContentRow
          key={index}
          index={index}
          postItItem={item}
        />
      ))}
    </div>
  );
};

export default PostitFormWorkoutContent;

import { PostItWorkout } from '../../../schema';
import PostitWorksheetCheckBox from '../PostitWorksheetCheckBox';

type Props = {
  workout: PostItWorkout;
  disabled: boolean;
};

const PostitThreeSentencesTopic_0 = ({ workout, disabled }: Props) => {
  return (
    <div className='grid grid-cols-[16px,1fr] gap-4 items-center'>
      <PostitWorksheetCheckBox
        value={10}
        workout={workout}
        disabled={disabled}
      />
      <div className='font-bold'>日文句尾需要句號「。」</div>
    </div>
  );
};

export default PostitThreeSentencesTopic_0;

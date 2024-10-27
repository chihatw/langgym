import { PostItWorkout } from '../../../schema';
import PostitWorksheetCheckBox from '../PostitWorksheetCheckBox';

type Props = {
  workout: PostItWorkout;
};

const PostitThreeSentencesTopic_1 = ({ workout }: Props) => {
  return (
    <div className='grid gap-0'>
      <div className='grid grid-cols-[16px,1fr] gap-4 items-center'>
        <PostitWorksheetCheckBox value={11} workout={workout} />
        <div className='font-bold'>日文句號前面需要禮貌題</div>
      </div>
      <div className='grid grid-cols-[16px,1fr] gap-4 items-center'>
        <div></div>
        <div>
          <div>日本人用普通體思考，但大家面前說話時會使用禮貌體。</div>
          <div>
            「句尾使用禮貌體」比較像是「禮物包裝🎀」。為自己買東西不用漂亮的包裝，可是送給別人時，有包裝看起來有禮貌。
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostitThreeSentencesTopic_1;

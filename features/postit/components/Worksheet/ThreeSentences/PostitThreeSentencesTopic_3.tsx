import { PostItWorkout } from '../../../schema';
import PostitWorksheetCheckBox from '../PostitWorksheetCheckBox';

type Props = {
  workout: PostItWorkout;
  disabled: boolean;
};

const PostitThreeSentencesTopic_3 = ({ workout, disabled }: Props) => {
  return (
    <div className='grid gap-0'>
      <div className='grid grid-cols-[16px,1fr] gap-4 items-center'>
        <PostitWorksheetCheckBox
          value={13}
          workout={workout}
          disabled={disabled}
        />
        <div className='font-bold'>「同一詞」不一定指出「同一個主題」</div>
      </div>
      <div className='grid grid-cols-[16px,1fr] gap-4 items-center'>
        <div></div>
        <div>
          <div>a. 田中さんは男性です。</div>
          <div>b. 田中さんは女性です。</div>
          <div>c. 田中さんは二人います。</div>
          <div>
            上面三個句字的主題都是「田中さん」<b>同一詞</b>
            ,卻談論的對象
            <b>不是同一個人</b>。
          </div>
          <div>a是田中先生，b是田中小姐，c是田中姓的人</div>
        </div>
      </div>
    </div>
  );
};

export default PostitThreeSentencesTopic_3;

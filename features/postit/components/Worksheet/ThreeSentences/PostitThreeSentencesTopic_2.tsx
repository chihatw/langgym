import { PostItWorkout } from '../../../schema';

import PostitWorksheetCheckBox from '../PostitWorksheetCheckBox';
import PostitThreeSentencesTableRow from './PostitThreeSentencesTableRow';

type Props = {
  workout: PostItWorkout;
  disabled: boolean;
};

const items_1: { label: string; sentence: string }[] = [
  {
    label: '未來',
    sentence: '明日、出発します。（我明天要出發。）',
  },
  {
    label: '現在',
    sentence: '今、運転しています。（我現在開車。）',
  },
  {
    label: '反覆',
    sentence: 'コーヒーをよく飲みます。（我常喝咖啡。）',
  },
  {
    label: '跟時間沒關係',
    sentence: '鳥は飛びます。（鳥會飛。）',
  },
];

const items_2: { label: string; sentence: string }[] = [
  {
    label: '過去',
    sentence: '昨日、風邪をひきました。（我昨天感冒了。）',
  },
  {
    label: '突然發現',
    sentence: '車が来たよ。（車子來了！）',
  },
  {
    label: '突然想起來',
    sentence: '明日、会議だった。（原來，明天有開會！）',
  },
];

const PostitThreeSentencesTopic_2 = ({ workout, disabled }: Props) => {
  return (
    <div className='grid gap-0'>
      <div className='grid grid-cols-[16px_1fr] gap-4 items-center'>
        <PostitWorksheetCheckBox
          value={12}
          workout={workout}
          disabled={disabled}
        />
        <div className='font-bold'>要注意時制</div>
      </div>
      <div className='grid grid-cols-[16px_1fr] gap-4 items-center'>
        <div></div>
        <div>
          <div>日文的句尾，隨著時態而變化。</div>
          <div className='border-black/40 border-t'>
            <PostitThreeSentencesTableRow label='原形' items={items_1} />
            <PostitThreeSentencesTableRow label='た形' items={items_2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostitThreeSentencesTopic_2;

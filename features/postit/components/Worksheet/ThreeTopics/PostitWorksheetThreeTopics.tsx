import { THREE_TOPICS_VALUES } from '@/features/postit/constants';
import { PostItWorkout } from '@/features/postit/schema';
import Image from 'next/image';
import PostitWorksheetAccordionWrapper from '../PostitWorksheetAccordionWrapper';
import PostitWorksheetCheckBox from '../PostitWorksheetCheckBox';
import PostitWorksheetMultipleCheckButton from '../PostitWorksheetMultipleCheckButton';
import ThreeTopicsImageForm from './ThreeTopicsImageForm';
import UploadThreeTopicsImage from './UploadThreeTopicsImage';

type Props = {
  workout: PostItWorkout;
  completed: boolean;
  preItemCompleted: boolean;
};

const PostitWorksheetThreeTopics = ({
  workout,
  preItemCompleted,
  completed,
}: Props) => {
  return (
    <PostitWorksheetAccordionWrapper
      label='4. 利貼造句（三個主題、三個句子）'
      preItemCompleted={preItemCompleted}
      completed={completed}
    >
      <div className='pl-[1em] grid gap-12'>
        <div className='grid gap-2'>
          <div className=''>確認後，請打勾</div>
          <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox
              value={40}
              workout={workout}
              disabled={completed}
            />
            <div className='font-bold'>沒有組合的利貼之間，要隔空一點</div>
            <div></div>
            <div>為了凸顯「助詞組合」</div>
          </div>
          <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox
              value={41}
              workout={workout}
              disabled={completed}
            />
            <div className='font-bold'>修飾同一個詞的利貼，要平行靠右對齊</div>
            <div></div>
            <div>
              日文，“<b>意思上</b>
              接到名詞”跟“<b>意思上</b>
              接到動詞”，修飾詞的<b>形狀不一樣</b>
            </div>
            <div></div>
            <div>
              所以造句時要注意的是，不是
              <b>文字上</b>的前後關係，是<b>意思上</b>的修飾關係
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div className='pl-[1em]'>
              <span className='text-red-500'>たくさん</span>
              いました。
            </div>
            <div></div>
            <div className='pl-[1em]'>
              <span className='text-red-500'>子どもが</span>
              いました。　→　<span className='text-red-500'>たくさん</span>
              子供がいました。
            </div>
            <div></div>
            <div>「たくさん」跟「子どもが」都修飾「いました」</div>
            <div></div>
            <div>
              <Image
                src={'/images/worksheets/three_topics_1.png'}
                alt={'three_topics_1'}
                width={512}
                height={512}
                className='rounded'
              />
            </div>
            <div className='h-4'></div>
            <div></div>
            <div></div>
            <div className='pl-[1em]'>
              <span className='text-red-500'>たくさんの</span>
              子ども
            </div>
            <div></div>
            <div className='pl-[1em]'>
              <span className='text-red-500'>子どもが</span>
              いました。　→　<span className='text-red-500'>たくさんの</span>
              子供がいました。
            </div>
            <div></div>
            <div>「たくさん」修飾「子ども」，「子どもが」修飾「いました」</div>

            <div></div>
            <div>
              <Image
                src={'/images/worksheets/three_topics_11.png'}
                alt={'three_topics_11'}
                width={512}
                height={512}
                className='rounded'
              />
            </div>
          </div>
          <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox
              value={42}
              workout={workout}
              disabled={completed}
            />
            <div className='font-bold'>主題右邊要畫線</div>
            <div></div>
            <div>
              一般來說，<b>主題跟句尾有修飾關係</b>
              ，所以依照「平行靠右對齊」規則來說，主題要放在句尾的旁邊。
            </div>
            <div></div>
            <div>
              但是，主題的<b>修飾潛伏力</b>很強，
              <span className='text-red-500 font-bold'>會超越單句</span>而
              <b>跟後面句子</b>的句尾<b>也會有修飾關係</b> 。
            </div>
            <div></div>
            <div>
              所以，主題右邊畫線而顯示「主題的<b>修飾潛伏力</b>， 會<b>超越</b>
              “單句修飾關係” 而跟後面句子也會有修飾關係」。
            </div>
            <div></div>
            <div>
              <Image
                src={'/images/worksheets/three_topics_2.png'}
                alt={'three_topics_2'}
                width={512}
                height={512}
                className='rounded'
              />
            </div>
          </div>
        </div>
        <PostitWorksheetMultipleCheckButton
          workout={workout}
          values={THREE_TOPICS_VALUES}
          disabled={completed}
        />
        <div className='grid gap-8'>
          {workout.descriptions.map((description, index) => (
            <div key={index} className='grid gap-2'>
              <div className='font-extrabold'>{description}</div>
              {workout.three_topics_image_urls.at(index) ? (
                <ThreeTopicsImageForm
                  index={index}
                  workout={workout}
                  url={workout.three_topics_image_urls.at(index)!}
                />
              ) : null}
              <UploadThreeTopicsImage
                index={index}
                workout={workout}
                disabled={THREE_TOPICS_VALUES.some(
                  (i) => !workout.checked.includes(i)
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </PostitWorksheetAccordionWrapper>
  );
};

export default PostitWorksheetThreeTopics;

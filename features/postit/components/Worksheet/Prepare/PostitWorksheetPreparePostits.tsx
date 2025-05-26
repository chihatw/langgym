import { PREPARE_POSTITS_VALUES } from '@/features/postit/constants';
import { PostItWorkout } from '@/features/postit/schema';
import Image from 'next/image';
import PostitWorksheetAccordionWrapper from '../PostitWorksheetAccordionWrapper';
import PostitWorksheetCheckBox from '../PostitWorksheetCheckBox';
import PostitWorksheetMultipleCheckButton from '../PostitWorksheetMultipleCheckButton';
import PostitWorksheetPrepareTableColorRow from './PostitWorksheetPrepareTableColorRow';

type Props = {
  workout: PostItWorkout;
  completed: boolean;
  preItemCompleted: boolean;
};

const PostitWorksheetPreparePostits = ({
  workout,
  completed,
  preItemCompleted,
}: Props) => {
  return (
    <PostitWorksheetAccordionWrapper
      label='2. 準備利貼'
      preItemCompleted={preItemCompleted}
      completed={completed}
    >
      <div className='pl-[1em] grid gap-12'>
        <div className='grid gap-2'>
          <div className=''>確認後，請打勾</div>
          <div className='grid grid-cols-[16px_1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox value={20} workout={workout} />
            <div className='font-bold'>顏色有4種、詞性有7種</div>
            <div></div>
            <div>
              <div className='border-black/40 border-t'>
                <PostitWorksheetPrepareTableColorRow
                  color='紅色'
                  bg='bg-red-200'
                  types={['名詞']}
                />
                <PostitWorksheetPrepareTableColorRow
                  color='藍色'
                  bg='bg-blue-200'
                  types={['動詞']}
                />
                <PostitWorksheetPrepareTableColorRow
                  color='黃色'
                  bg='bg-amber-100'
                  types={['い形容詞', '助詞', '其他']}
                />
                <PostitWorksheetPrepareTableColorRow
                  color='綠色'
                  bg='bg-lime-200'
                  types={['な形容詞', '名詞後面']}
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-[16px_1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox value={21} workout={workout} />
            <div className='font-bold'>符號有2種</div>
            <div></div>
            <div>
              <div className='border-black/40 border-t'>
                <PostitWorksheetPrepareTableColorRow
                  color='蝴蝶結🎀'
                  types={['代表禮貌體']}
                />
                <PostitWorksheetPrepareTableColorRow
                  color='箭號➡️'
                  types={['代表繼續句子']}
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-[16px_1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox value={22} workout={workout} />
            <div className='font-bold'>線條有2種</div>
            <div></div>
            <div>
              <div className='border-black/40 border-t'>
                <PostitWorksheetPrepareTableColorRow
                  color='紅色'
                  bg='bg-red-200'
                  types={['接到名詞']}
                />
                <PostitWorksheetPrepareTableColorRow
                  color='藍色'
                  bg='bg-blue-200'
                  types={['接到「動詞」']}
                />
              </div>
            </div>
            <div></div>
            <div>※其實，藍色線條也可以接到「い形容詞、な形容詞、名詞後面」</div>
          </div>
          <div className='grid grid-cols-[16px_1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox value={23} workout={workout} />
            <div className='font-bold'>
              膠的部分放在<span className='text-red-500'>右邊</span>
            </div>
            <div></div>
            <div>
              日文基本結構是<b>重點放在最後</b>，前面是後面的<b>補充說明</b>
              ，有「前面是<b>輔</b>，後面是<b>主</b>
              」的主輔關係。「右邊有膠」代表「連接到（意思上的）後面的詞」。
            </div>
            <div></div>
            <div>
              意思上的後面，跟文字上的後面並不一致。（「4.
              利貼造句」時，再說明）
            </div>
            <div></div>
            <div>
              <Image
                src={'/images/worksheets/prepare_1.png'}
                alt={'prepare_1'}
                width={512}
                height={512}
                className='rounded'
              />
            </div>
          </div>
          <PostitWorksheetMultipleCheckButton
            workout={workout}
            values={PREPARE_POSTITS_VALUES}
            disabled={completed}
          />
        </div>
      </div>
    </PostitWorksheetAccordionWrapper>
  );
};

export default PostitWorksheetPreparePostits;

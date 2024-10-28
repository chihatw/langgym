import { COMBINED_VALUES } from '@/features/postit/constants';
import { PostItWorkout } from '@/features/postit/schema';
import Image from 'next/image';
import PostitWorksheetAccordionWrapper from '../PostitWorksheetAccordionWrapper';
import PostitWorksheetCheckBox from '../PostitWorksheetCheckBox';
import PostitWorksheetMultipleCheckButton from '../PostitWorksheetMultipleCheckButton';

type Props = {
  workout: PostItWorkout;
  completed: boolean;
  preItemCompleted: boolean;
};

const PostitWorksheetCombinePostits = ({
  workout,
  completed,
  preItemCompleted,
}: Props) => {
  return (
    <PostitWorksheetAccordionWrapper
      label='3. 助詞組合'
      preItemCompleted={preItemCompleted}
      completed={completed}
    >
      <div className='pl-[1em] grid gap-12'>
        <div className='grid gap-2'>
          <div className=''>確認後，請打勾</div>
          <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox value={30} workout={workout} />
            <div className='font-bold'>
              「<span className='text-red-500'>助詞</span>」與「
              <span className='text-red-500'>名詞後面</span>
              」，跟前一個名詞要組合
            </div>
            <div></div>
            <div>
              日文的詞序比較自由，可以變來變去，卻「名詞+
              <span className='text-red-500'>助詞</span>
              」「名詞+<span className='text-red-500'>名詞後面</span>
              」的搭配是固定的。
            </div>
            <div></div>
            <div>
              <Image
                src={'/images/worksheets/combine_1.png'}
                alt={'combine_1'}
                width={512}
                height={512}
                className='rounded'
              />
            </div>
          </div>
          <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox value={31} workout={workout} />
            <div className='font-bold'>組合是為了方便</div>
            <div></div>
            <div>
              練習上，一下子要移動、一下子要拿下。「名詞+助詞」「名詞+名詞後面」這兩個搭配，都是一起移動或一起拿下，所以，先組合起來比較方便。
            </div>
            <div></div>
            <div>
              <b>其他的搭配</b>
              ，有「一個要移動、一個不用移動」等的情況。<b>請不要組合</b>。
            </div>
            <div></div>
            <div>
              <Image
                src={'/images/worksheets/combine_2.png'}
                alt={'combine_2'}
                width={512}
                height={512}
                className='rounded'
              />
            </div>
          </div>
          <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
            <PostitWorksheetCheckBox value={32} workout={workout} />
            <div className='font-bold'>左邊上、右邊下</div>
            <div></div>
            <div>右邊有膠，因此右邊要下、左邊要上。</div>
            <div></div>
            <div>
              <Image
                src={'/images/worksheets/combine_3.png'}
                alt={'combine_3'}
                width={512}
                height={512}
                className='rounded'
              />
            </div>
          </div>
          <PostitWorksheetMultipleCheckButton
            workout={workout}
            values={COMBINED_VALUES}
            disabled={completed}
          />
        </div>
      </div>
    </PostitWorksheetAccordionWrapper>
  );
};

export default PostitWorksheetCombinePostits;

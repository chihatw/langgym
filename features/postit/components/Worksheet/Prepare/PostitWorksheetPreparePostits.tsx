import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PREPARE_POSTITS_VALUES } from '@/features/postit/constants';
import { PostItWorkout } from '@/features/postit/schema';
import { cn } from '@/lib/utils';
import PostitWorksheetCheckBox from '../PostitWorksheetCheckBox';
import PostitWorksheetMultipleCheckButton from '../PostitWorksheetMultipleCheckButton';
import PostitWorksheetPrepareTableColorRow from './PostitWorksheetPrepareTableColorRow';

type Props = {
  workout: PostItWorkout;
};

const PostitWorksheetPreparePostits = ({ workout }: Props) => {
  return (
    <Accordion type='single' collapsible disabled={!workout.japanese_passed}>
      <AccordionItem value='value-1'>
        <AccordionTrigger>
          <div
            className={cn(
              'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
              !workout.japanese_passed && 'text-slate-400 cursor-not-allowed'
            )}
          >
            <div>2. 準備利貼</div>
            {PREPARE_POSTITS_VALUES.every((i) =>
              workout.checked.includes(i)
            ) ? (
              <div>✅</div>
            ) : null}
          </div>
        </AccordionTrigger>
        {/* textarea の outline が accordion の描画幅内に収まるように px-1 */}
        <AccordionContent className='px-1'>
          <div className='pl-[1em] grid gap-12'>
            <div className='grid gap-2'>
              <div className=''>確認後，請打勾</div>
              <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
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
              <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
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
              <div className='grid grid-cols-[16px,1fr] gap-x-4 gap-y-2 items-center'>
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
                <div>
                  ※其實，藍色線條也可以接到「い形容詞、な形容詞、名詞後面」
                </div>
              </div>
              <PostitWorksheetMultipleCheckButton
                workout={workout}
                values={PREPARE_POSTITS_VALUES}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostitWorksheetPreparePostits;

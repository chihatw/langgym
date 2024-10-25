import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { PREPARE_POSTITS_VALUES } from '../../constants';
import { PostItWorkout } from '../../schema';
import PostitWorksheetCheckBox from './PostitWorksheetCheckBox';
import PostitWorksheetGoal from './PostitWorksheetGoal';
import PostitWorksheetMultipleCheckButton from './PostitWorksheetMultipleCheckButton';
import PostitWorksheetPapers from './PostitWorksheetPapers';
import PostitWorksheetPrepareTableColorRow from './PostitWorksheetPrepareTableColorRow';
import PostitWorksheetRoadmap from './PostitWorksheetRoadmap';
import PostitWorksheetThreeSentences from './PostitWorksheetThreeSentences';

type Props = { workout: PostItWorkout };

const PostitWorksheetContainer = ({ workout }: Props) => {
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>利貼學習單</div>
      <div className='grid gap-0'>
        <PostitWorksheetGoal />
        <PostitWorksheetPapers />
        <PostitWorksheetRoadmap workout={workout} />
        <PostitWorksheetThreeSentences workout={workout} />
        {/* 2. 準備利貼 */}
        <Accordion
          type='single'
          collapsible
          disabled={!workout.japanese_passed}
        >
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  !workout.japanese_passed &&
                    'text-slate-400 cursor-not-allowed'
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
        <Accordion
          type='single'
          collapsible
          disabled={PREPARE_POSTITS_VALUES.some(
            (i) => !workout.checked.includes(i)
          )}
        >
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  PREPARE_POSTITS_VALUES.some(
                    (i) => !workout.checked.includes(i)
                  ) && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>3. 助詞組合</div>
                {[9999].every((i) => workout.checked.includes(i)) ? (
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
                    <PostitWorksheetCheckBox value={30} workout={workout} />
                    <div className='font-bold'>
                      「助詞」與「名詞後面」，跟前一個名詞要組合
                    </div>
                    <div></div>
                    <div>
                      日文的詞序比較自由，可以變來變去，卻「名詞+助詞」「名詞+名詞後面」的搭配是固定的。
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>4. 利貼造句（三個主題、三個句子）</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>5. 句子排序</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>6. 利貼造句（一個主題、三個句子）</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>7. 利貼造句（一個主題、一個句子）</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <Accordion type='single' collapsible disabled>
          <AccordionItem value='value-1'>
            <AccordionTrigger>
              <div
                className={cn(
                  'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
                  true && 'text-slate-400 cursor-not-allowed'
                )}
              >
                <div>8. 導入主題</div>
                {false ? <div>✅</div> : null}
              </div>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PostitWorksheetContainer;

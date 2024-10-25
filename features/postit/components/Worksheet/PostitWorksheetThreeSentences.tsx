import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { THREE_SENTENCES_VALUES } from '../../constants';
import { PostItWorkout } from '../../schema';
import PostitThreeSentencesTextarea from './PostitThreeSentencesTextarea';
import PostitThreeSentencesTopic_0 from './PostitThreeSentencesTopic_0';
import PostitThreeSentencesTopic_1 from './PostitThreeSentencesTopic_1';
import PostitThreeSentencesTopic_2 from './PostitThreeSentencesTopic_2';
import PostitThreeSentencesTopic_3 from './PostitThreeSentencesTopic_3';
import PostitWorksheetMultipleCheckButton from './PostitWorksheetMultipleCheckButton';

type Props = {
  workout: PostItWorkout;
};

const PostitWorksheetThreeSentences = ({ workout }: Props) => {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='value-1'>
        <AccordionTrigger>
          <div className='text-xl text-slate-700 font-extrabold flex gap-2 items-center'>
            <div>1. 寫三個日文短句</div>
            {workout.japanese_passed ? <div>✅</div> : null}
          </div>
        </AccordionTrigger>
        {/* textarea の outline が accordion の描画幅内に収まるように px-1 */}
        <AccordionContent className='px-1'>
          <div className='pl-[1em] grid gap-12'>
            <div className='text-lg'>
              請寫出關於<b>同一主題</b>的三個日文短句
            </div>
            <div className='grid gap-2'>
              <div className=''>確認後，請打勾</div>
              <PostitThreeSentencesTopic_0 workout={workout} />
              <PostitThreeSentencesTopic_1 workout={workout} />
              <PostitThreeSentencesTopic_2 workout={workout} />
              <PostitThreeSentencesTopic_3 workout={workout} />
              <PostitWorksheetMultipleCheckButton
                workout={workout}
                values={THREE_SENTENCES_VALUES}
              />
            </div>

            <PostitThreeSentencesTextarea
              workout={workout}
              values={THREE_SENTENCES_VALUES}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostitWorksheetThreeSentences;

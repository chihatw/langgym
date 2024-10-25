import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {};

const PostitWorksheetGoal = (props: Props) => {
  return (
    <Accordion type='single' defaultValue={'value-1'} collapsible>
      <AccordionItem value={'value-1'}>
        <AccordionTrigger>
          <div className='text-xl text-slate-700 font-extrabold'>練習目標</div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='pl-[1em]'>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className=' text-slate-700 font-extrabold'>
                    動手理解 日文結構
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-slate-700 text-lg'>
                  <div>
                    什麼時候要使用<b>禮貌體</b>，什麼時候要使用<b>普通體</b>
                  </div>
                  <div>
                    <b>單句</b>怎麼變成<b>複句</b>，<b>複句</b>怎麼分成
                    <b>單句</b>
                  </div>
                  <div>
                    <b>修飾關係</b>
                  </div>
                  <div>
                    <b>主題</b>是什麼？
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostitWorksheetGoal;

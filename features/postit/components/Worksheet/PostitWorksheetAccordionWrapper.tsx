import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { cn } from '@/lib/utils';

type Props = {
  label: string;
  preItemCompleted: boolean;
  completed: boolean;
  children: React.ReactNode;
};

const PostitWorksheetAccordionWrapper = ({
  preItemCompleted,
  completed,
  label,
  children,
}: Props) => {
  return (
    <Accordion type='single' collapsible disabled={!preItemCompleted}>
      <AccordionItem value='value-1'>
        <AccordionTrigger>
          <div
            className={cn(
              'text-xl text-slate-700 font-extrabold flex gap-2 items-center',
              !preItemCompleted && 'text-slate-400 cursor-not-allowed'
            )}
          >
            <div>{label}</div>
            {completed ? <div>✅</div> : null}
          </div>
        </AccordionTrigger>
        {/* textarea の outline が accordion の描画幅内に収まるように px-1 */}
        <AccordionContent className='px-1'>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostitWorksheetAccordionWrapper;

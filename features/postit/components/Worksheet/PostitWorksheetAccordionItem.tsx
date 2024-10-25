import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FileDown } from 'lucide-react';
import PostitWorksheetImageDialog from './PostitWorksheetImageDialog';

type Props = {
  value: string;
  label: string;
  filledFilename: string;
  blankFilename: string;
  pdfFilename: string;
};

const PostitWorksheetAccordionItem = ({
  value,
  label,
  filledFilename,
  blankFilename,
  pdfFilename,
}: Props) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{label}</AccordionTrigger>
      <AccordionContent>
        <div className='grid gap-4'>
          <PostitWorksheetImageDialog
            src={`/images/worksheets/${filledFilename}`}
            alt={filledFilename}
          />
          <PostitWorksheetImageDialog
            src={`/images/worksheets/${blankFilename}`}
            alt={blankFilename}
          />
          <a
            href={`/assets/worksheets/${pdfFilename}`}
            download={pdfFilename}
            className={cn(
              buttonVariants(),
              'flex gap-2 items-center cursor-pointer'
            )}
          >
            <span>{pdfFilename}</span>
            <FileDown className='h-4 w-4' />
          </a>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PostitWorksheetAccordionItem;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import PostitWorksheetAccordionItem from './PostitWorksheetAccordionItem';

type Props = {};

const PostitWorksheetPapers = (props: Props) => {
  return (
    <Accordion type='single' defaultValue={'value-1'} collapsible>
      <AccordionItem value={'value-1'}>
        <AccordionTrigger>
          <div className='text-xl text-slate-700 font-extrabold'>作業台</div>
        </AccordionTrigger>
        <AccordionContent>
          <div className='pl-[1em]'>
            <Accordion type='multiple'>
              <PostitWorksheetAccordionItem
                value='item-1'
                label='1號（名詞、助詞、其他）'
                filledFilename='ws_1.jpeg'
                blankFilename='blank_1.jpeg'
                pdfFilename='1號作業台.pdf'
              />
              <PostitWorksheetAccordionItem
                value='item-2'
                label='2號（動詞、い形容詞、な形容詞、名詞後面）'
                filledFilename='ws_2.jpeg'
                blankFilename='blank_2.jpeg'
                pdfFilename='2號作業台.pdf'
              />
              <PostitWorksheetAccordionItem
                value='item-3'
                label='3號（動詞）'
                filledFilename='ws_3.jpeg'
                blankFilename='blank_3.jpeg'
                pdfFilename='3號作業台.pdf'
              />
              <PostitWorksheetAccordionItem
                value='item-4'
                label='4號（い形容詞）'
                filledFilename='ws_4.jpeg'
                blankFilename='blank_4.jpeg'
                pdfFilename='4號作業台.pdf'
              />
              <PostitWorksheetAccordionItem
                value='item-5'
                label='5號（な形容詞）'
                filledFilename='ws_5.jpeg'
                blankFilename='blank_5.jpeg'
                pdfFilename='5號作業台.pdf'
              />
              <PostitWorksheetAccordionItem
                value='item-6'
                label='6號（名詞後面）'
                filledFilename='ws_6.jpeg'
                blankFilename='blank_6.jpeg'
                pdfFilename='6號作業台.pdf'
              />
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostitWorksheetPapers;

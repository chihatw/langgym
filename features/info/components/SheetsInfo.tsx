import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileImage } from 'lucide-react';
import Image from 'next/image';

type Props = {};

const items = [
  { label: '1號', filename: 'sheet1' },
  { label: '2號', filename: 'sheet2' },
  { label: '3號', filename: 'sheet3' },
  { label: '4號', filename: 'sheet4' },
  { label: '5號', filename: 'sheet5' },
  { label: '6號', filename: 'sheet6' },
];

const SheetsInfo = (props: Props) => {
  return (
    <div>
      <div>・「作業台」一號到六號拍給我看</div>
      <div className='pl-4 grid gap-2'>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
              <div className='flex gap-1 items-center'>
                <div className='text-sm text-gray-500'>作業台圖片</div>
                <FileImage className='text-gray-500 h-4 w-4' />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='grid gap-4'>
                {items.map((item, index) => (
                  <div className='grid gap-2' key={index}>
                    <div className='text-sm text-gray-500'>{item.label}</div>
                    <div className='flex-1 rounded-lg overflow-hidden'>
                      <Image
                        src={`/images/${item.filename}.jpg`}
                        alt='sheet1'
                        width={512}
                        height={512}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SheetsInfo;

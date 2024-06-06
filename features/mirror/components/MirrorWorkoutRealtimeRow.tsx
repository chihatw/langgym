import FlipWrapper from '@/components/FlipWrapper';
import { cn } from '@/lib/utils';
import { Lato } from 'next/font/google';

const lato = Lato({ subsets: ['latin'], weight: '900' });

type Props = {
  toggle: boolean;
  label: string;
  highlights: number[];
  back: string;
  highlights_back: number[];
};

const MirrorWorkoutRealtimeRow = ({
  toggle,
  label,
  highlights,
  back,
  highlights_back,
}: Props) => {
  return (
    <div className='flex justify-center'>
      <FlipWrapper toggle={toggle}>
        <div
          className={cn(
            'p-4 text-6xl bg-white rounded h-[92px] w-96 text-center opacity-0',
            lato.className
          )}
        >
          {label.split('').map((char, index) => (
            <span
              key={index}
              className={highlights.includes(index) ? 'text-red-500' : ''}
            >
              {char}
            </span>
          ))}
        </div>
        {/* これが表 */}
        <div
          style={{ backfaceVisibility: back ? 'hidden' : 'visible' }}
          className={cn(
            'absolute　p-4 text-6xl bg-white rounded h-[92px] w-96 text-center top-0',
            lato.className
          )}
        >
          {label.split('').map((char, index) => (
            <span
              key={index}
              className={highlights.includes(index) ? 'text-red-500' : ''}
            >
              {char}
            </span>
          ))}
        </div>
        {/* これが裏 */}
        {back ? (
          <div
            style={{ backfaceVisibility: back ? 'hidden' : 'visible' }}
            className={cn(
              'absolute　p-4 text-6xl bg-white rounded h-[92px] w-96 text-center top-0　[transform:rotateY(180deg)]',
              lato.className
            )}
          >
            {back.split('').map((char, index) => (
              <span
                key={index}
                className={
                  highlights_back.includes(index) ? 'text-red-500' : ''
                }
              >
                {char}
              </span>
            ))}
          </div>
        ) : null}
      </FlipWrapper>
    </div>
  );
};

export default MirrorWorkoutRealtimeRow;

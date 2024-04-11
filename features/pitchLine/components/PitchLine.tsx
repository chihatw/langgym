import { buildPitches, checkIsOdaka } from '../services/utils';
import MoraCircle from './MoraCircle';
import MoraString from './MoraString';
import SVGLine from './SVGLine';

const WIDTH = 15;

const PitchLine = ({ pitchStr }: { pitchStr: string }) => {
  if (!pitchStr) {
    return <div className='h-10 w-[15px]'></div>;
  }

  const pitches = buildPitches(pitchStr);

  const isOdaka = checkIsOdaka(pitches);
  isOdaka && pitches.pop();
  const lineWidth = pitches.length * WIDTH + (isOdaka ? WIDTH : 0);

  return (
    <div className='relative h-10'>
      <div
        className='absolute top-0 h-5 overflow-hidden'
        style={{ width: lineWidth }}
      >
        <SVGLine isOdaka={isOdaka} pitches={pitches} width={WIDTH} />
      </div>
      <div className='flex flex-nowrap '>
        {pitches.map((_, index) => (
          <div key={index} className='grid h-10 w-[15px] grid-rows-2 '>
            <MoraCircle index={index} pitches={pitches} />
            <MoraString index={index} pitches={pitches} isOdaka={isOdaka} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchLine;

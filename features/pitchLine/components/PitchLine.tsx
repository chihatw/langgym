import { ACCENT_MARK, PITCH_LINE_WIDTH } from '../constants';
import { buildHasAccent, buildMoras, buildPitches } from '../services/utils';
import MoraCircle from './MoraCircle';
import MoraString from './MoraString';
import SVGLine from './SVGLine';

const PitchLine = ({ pitchStr }: { pitchStr: string }) => {
  if (!pitchStr) {
    return <div className='h-10 w-[15px]'></div>;
  }

  const moras = buildMoras(pitchStr);
  const pitches = buildPitches(pitchStr);
  const isOdaka = pitchStr.at(-1) === ACCENT_MARK;
  const hasAccent = buildHasAccent(pitches, isOdaka);
  const isKanaWord = moras.every((mora) => {
    return /^[\p{scx=Hiragana}\p{scx=Katakana}]+$/u.test(mora);
  });

  const span = isOdaka ? moras.length + 1 : moras.length;
  const lineWidth = span * PITCH_LINE_WIDTH;

  return (
    <div className='relative h-10'>
      <div
        className='absolute top-0 h-5 overflow-hidden'
        style={{ width: lineWidth }}
      >
        {isKanaWord ? <SVGLine pitches={pitches} isOdaka={isOdaka} /> : null}
      </div>
      <div className='flex flex-nowrap '>
        {moras.map((_, index) => (
          <div key={index} className='grid h-10 w-[15px] grid-rows-2 '>
            <MoraCircle
              isMute={['っ', 'ッ'].includes(moras[index])}
              isKanaWord={isKanaWord}
              isHigh={pitches[index]}
            />
            <MoraString mora={moras[index]} isAccentCore={hasAccent[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchLine;

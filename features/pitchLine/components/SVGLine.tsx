import { PITCH_LINE_WIDTH } from '../constants';

const SVGLine = ({
  pitches,
  isOdaka,
}: {
  pitches: boolean[];
  isOdaka: boolean;
}) => {
  const { points, odakaLastPoint } = buildPoints(pitches);

  return (
    <svg>
      <polyline
        className={`fill-none stroke-[#52a2aa] stroke-2`}
        points={points}
      />
      {isOdaka && (
        <polyline
          className='fill-none stroke-[#52a2aa] stroke-[3px]'
          strokeDasharray='2 2'
          strokeDashoffset='1'
          points={odakaLastPoint}
        />
      )}
    </svg>
  );
};

export default SVGLine;

const HIGH_POSITION = 7.8;
const LOW_POSITION = 17;

const buildPoints = (pitches: boolean[]) => {
  const points = pitches.reduce((acc, cur, index) => {
    const isHigh = cur;
    return [
      ...acc,
      PITCH_LINE_WIDTH * (1 / 2 + index),
      isHigh ? HIGH_POSITION : LOW_POSITION,
    ];
  }, [] as number[]);

  const lastXPos = PITCH_LINE_WIDTH * (pitches.length - 1 / 2);

  return {
    points: points.join(','),
    odakaLastPoint: [
      lastXPos,
      HIGH_POSITION,
      lastXPos + PITCH_LINE_WIDTH,
      LOW_POSITION,
    ].join(','),
  };
};

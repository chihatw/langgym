const MoraString = ({
  index,
  pitches,
  isOdaka,
}: {
  index: number;
  isOdaka: boolean;
  pitches: string[][];
}) => {
  const mora = pitches.at(index)?.at(0);
  const isAccentCore = calcIsAccentCore(index, pitches, isOdaka);
  return (
    <div className="flex items-center justify-center ">
      <div
        className={`${
          isAccentCore ? "text-[#f50057]" : "text-inherit"
        } origin-left scale-x-[0.8] select-none whitespace-nowrap text-center text-[11px] -tracking-[2px]`}
      >
        {mora}
      </div>
    </div>
  );
};

export default MoraString;

const calcIsAccentCore = (
  index: number,
  pitches: string[][],
  isOdaka: boolean,
) => {
  const isLast = index === pitches.length - 1;
  // 尾高の場合は
  // 最後がアクセント、最後以外はアクセントでは無い
  if (isOdaka) return isLast;

  // 尾高じゃ無い場合は
  // 最後以外で、自身が高ピッチで、　後ろが低ピッチの場合
  return !isLast && !!pitches.at(index)?.at(1) && !pitches.at(index + 1)?.at(1);
};

const MoraCircle = ({
  index,
  pitches,
}: {
  index: number;
  pitches: string[][];
}) => {
  const mora = pitches.at(index)?.at(0) || "";
  const isHigh = !!pitches.at(index)?.at(1);
  const isMute = ["っ", "ッ"].includes(mora);
  const isKanaWord = pitches.every((pitch) => {
    const mora = pitch.at(0) || "";
    return /^[\p{scx=Hiragana}\p{scx=Katakana}]+$/u.test(mora);
  });

  if (!mora) return null;

  if (!isKanaWord) {
    return <div className="h-2 w-2"></div>;
  }

  return (
    <div className={`flex justify-center  ${isHigh ? "mt-1" : "mt-[13px]"}`}>
      <div
        className={`z-10 h-2 w-2 rounded-full border-2 bg-white ${
          isMute ? "border-gray-400" : "border-[#52a2aa]"
        }`}
      />
    </div>
  );
};

export default MoraCircle;

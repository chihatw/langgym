const MoraCircle = ({
  isMute,
  isHigh,
  isKanaWord,
}: {
  isMute: boolean;
  isHigh: boolean;
  isKanaWord: boolean;
}) => {
  if (!isKanaWord) {
    return <div className='h-2 w-2'></div>;
  }

  return (
    <div className={`flex justify-center  ${isHigh ? 'mt-1' : 'mt-[13px]'}`}>
      <div
        className={`z-10 h-2 w-2 rounded-full border-2 bg-white ${
          isMute ? 'border-gray-400' : 'border-[#52a2aa]'
        }`}
      />
    </div>
  );
};

export default MoraCircle;

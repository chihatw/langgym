const MoraString = ({
  mora,
  isAccentCore,
}: {
  mora: string;
  isAccentCore: boolean;
}) => {
  return (
    <div className='flex items-center justify-center '>
      <div
        className={`${
          isAccentCore ? 'text-[#f50057]' : 'text-inherit'
        } origin-left scale-x-[0.8] select-none whitespace-nowrap text-center text-[11px] -tracking-[2px]`}
      >
        {mora}
      </div>
    </div>
  );
};

export default MoraString;

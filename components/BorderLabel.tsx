type Props = { label: string };

const BorderLabel = ({ label }: Props) => {
  return (
    <div className='font-extralight  border-l-8 border-gray-800 rounded py-2 bg-gray-800 bg-opacity-10 text-sm'>
      <span className='pl-2'>{label}</span>
    </div>
  );
};

export default BorderLabel;

type Props = {
  label: string;
  sentence: string;
};

const PostitThreeSentencesTableRowSentenceCell = ({
  label,
  sentence,
}: Props) => {
  return (
    <div className='grid grid-cols-[100px,1fr] border-black/40 border-b'>
      <div className='font-bold border-black/40 border-r flex justify-center items-center'>
        {label}
      </div>
      <div className='pl-2'>{sentence}</div>
    </div>
  );
};

export default PostitThreeSentencesTableRowSentenceCell;

import PostitThreeSentencesTableRowSentenceCell from './PostitThreeSentencesTableRowSentenceCell';

type Props = {
  label: string;
  items: { label: string; sentence: string }[];
};

const PostitThreeSentencesTableRow = ({ label, items }: Props) => {
  return (
    <div className='grid grid-cols-[40px,1fr] items-center border-black/40 border-r'>
      <div className=' h-full border-r border-l border-b  border-black/40 flex items-center justify-center'>
        {label}
      </div>
      <div>
        {items.map((item, index) => (
          <PostitThreeSentencesTableRowSentenceCell
            key={index}
            label={item.label}
            sentence={item.sentence}
          />
        ))}
      </div>
    </div>
  );
};

export default PostitThreeSentencesTableRow;

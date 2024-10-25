type Props = {
  types: string[];
};

const PostitWorksheetPrepareTableTypeCells = ({ types }: Props) => {
  return (
    <div>
      {types.map((type, index) => (
        <div
          className='flex  border-black/40 border-b   justify-center items-center'
          key={index}
        >
          {type}
        </div>
      ))}
    </div>
  );
};

export default PostitWorksheetPrepareTableTypeCells;

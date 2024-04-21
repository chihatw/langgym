import Breadcrumb from '@/components/Breadcrumb';

type Props = {
  params: { id: number };
};

const AnswerPage = ({ params: { id } }: Props) => {
  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label='アクセント問題 回答' />
      {/* todo */}
    </div>
  );
};

export default AnswerPage;

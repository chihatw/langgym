import PageStateForm from '@/features/pageState/components/PageStateForm';
import { fetchPageStates } from '@/features/pageState/services/server';
import MngOpenForm from '@/features/realtime/components/MngOpenForm';
import { fetchOpens } from '@/features/realtime/services/server';

type Props = {};

const page = async (props: Props) => {
  const opens = await fetchOpens();
  const pageStates = await fetchPageStates();

  return (
    <div className='grid gap-8'>
      <MngOpenForm opens={opens} />
      <PageStateForm pageStates={pageStates} />
    </div>
  );
};

export default page;

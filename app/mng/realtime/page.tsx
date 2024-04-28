import { fetchPageStates } from '@/features/pageState/services/server';
import MngRealtimeForm from '@/features/realtime/components/MngRealtimeForm';

type Props = {};

const page = async (props: Props) => {
  const pageStates = await fetchPageStates();

  return <MngRealtimeForm pageStates={pageStates} />;
};

export default page;

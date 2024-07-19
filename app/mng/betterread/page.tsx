import MngBetterreadForm from '@/features/betterread/components/MngBetterreadForm/MngBetterreadForm';
import { fetchUsers } from '@/features/user/services/server';

type Props = {};

const MngBetterreadCreatePage = async (props: Props) => {
  const users = await fetchUsers();
  return <MngBetterreadForm users={users} />;
};

export default MngBetterreadCreatePage;

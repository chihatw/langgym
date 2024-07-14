import { fetchRedirectTos } from '../../services/sever';
import MngRedirectToForm from './MngRedirectToForm';

type Props = {};

const MngRedirectToFormLoader = async (props: Props) => {
  const redirectTos = await fetchRedirectTos();

  return <MngRedirectToForm redirectTos={redirectTos} />;
};

export default MngRedirectToFormLoader;

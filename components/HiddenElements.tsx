import RedirectController from '@/features/redirectTo/components/RedirectController';

type Props = {
  uid: string;
  cheat?: boolean;
};

const HiddenElements = ({ uid, cheat }: Props) => {
  return <RedirectController uid={uid} />;
};

export default HiddenElements;

import MngPaneContainer from '@/components/MngPaneContainer';
import { RedirectToView } from '../../schema';
import MngRedirectToFormRow from './MngRedirectToFormRow';

type Props = {
  redirectTos: RedirectToView[];
};

const MngRedirectToForm = ({ redirectTos }: Props) => {
  return (
    <MngPaneContainer label='Redirect to' open>
      <div className='grid gap-4'>
        {redirectTos
          .sort((a, b) => a.id! - b.id!)
          .map((item) => (
            <MngRedirectToFormRow redirectTo={item} key={item.id} />
          ))}
      </div>
    </MngPaneContainer>
  );
};

export default MngRedirectToForm;

import ChangePasswordForm from '@/features/auth/components/ChangePasswordForm';

type Props = {};

const AuthPage = (props: Props) => {
  return (
    <div className='max-w-sm mx-auto pt-10'>
      <ChangePasswordForm />
    </div>
  );
};

export default AuthPage;

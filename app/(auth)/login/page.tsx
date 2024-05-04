import EmailLoginForm from '@/features/auth/components/EmailLoginForm';

const Login = async () => {
  // ログインページでは uid が取得できないので、pathnamelog は form の中
  return <EmailLoginForm />;
};

export default Login;

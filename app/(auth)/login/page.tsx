import LoginForm from '@/features/auth/components/MagicLinkForm';

const Login = () => {
  return (
    <div>
      <div className='flex flex-col items-center text-2xl font-extralight pt-20 gap-1 text-gray-500'>
        <span>{`We'll send`}</span>
        <span className='space-x-[0.5em]'>
          <span>{`a`}</span>
          <span className='font-extrabold text-4xl text-gray-700'>{`Magic Link`}</span>
        </span>
        <span>{`to your mailbox.`}</span>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;

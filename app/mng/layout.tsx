import MngHeader from '@/components/MngHeader';

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-4 max-w-lg mx-auto pb-40'>
      <MngHeader />
      {children}
    </div>
  );
}

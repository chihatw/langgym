import MngHeader from '@/features/mng/components/MngHeader';

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-4 max-w-lg mx-auto pt-10 pb-40'>
      <MngHeader />
      {children}
    </div>
  );
}

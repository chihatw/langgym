export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='space-y-4'>
      <div>header</div>
      {children}
    </div>
  );
}

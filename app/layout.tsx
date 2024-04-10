import Header from '@/components/header';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'grid min-h-screen grid-rows-[48px,1fr] bg-slate-200 font-sans text-gray-700',
          fontSans.className
        )}
      >
        <Header />
        <div className='pt-10'>
          {/* ↑↑↑ max-w-xs を grid の 子要素にそのままつけると効かない */}
          <div className='max-w-md mx-auto'>{children}</div>
        </div>
      </body>
    </html>
  );
}

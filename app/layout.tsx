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
          'grid min-h-screen grid-rows-[48px,1fr] bg-slate-200 font-sans text-gray-700 print:text-black',
          fontSans.className
        )}
      >
        <Header />
        {/* <div className='pt-10 pb-40 print:pt-0'> */}
        {/* ↑↑↑ max-w-xs を grid の 子要素にそのままつけると効かない */}
        {/* <div className='max-w-lg mx-auto '>{children}</div> */}
        <div>{children}</div>
        {/* </div> */}
      </body>
    </html>
  );
}

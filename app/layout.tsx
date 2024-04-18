import Header from '@/components/Header';
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
        <div>{children}</div>
      </body>
    </html>
  );
}

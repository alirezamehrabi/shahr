import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shahr WebApp task',
  description: 'Products & Users Browser App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="w-full p-[40px_40px] shadow-[0px_1px_4px_2px_#ccc] mb-[16px]">
          <Link
            href={`/`}
            className="font-[700] text-[24px] text-[#777] transition duration-[1s] transform hover:translate-x-1"
          >
            Site Logo
          </Link>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

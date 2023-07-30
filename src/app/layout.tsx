/* eslint-disable @next/next/no-sync-scripts */
import { Github } from 'lucide-react';
import { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

import { ThemeSelector } from '@/components/ThemeSelector';

import './globals.css';

const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Food Wheel',
  description:
    "Don't know where to eat ? The food wheel will tell you where to go !",
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFCFC' },
    { media: '(prefers-color-scheme: dark)', color: '#121217' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${work_sans.variable} m-0 h-full bg-main-bg p-0`}
      suppressHydrationWarning
    >
      {/* <head /> will contain components hydrated by the metadata constant.
       * Find out more at https://beta.nextjs.org/docs/api-reference/metadata */}
      <head>
        {/* FIXME: <Script /> does NOT work yet, use a better method then this <script> when available */}
        <script
          id="init-theme"
          type="text/javascript"
          src="/scripts/initTheme.min.js"
        />
      </head>

      <body className="h-full antialiased">
        {/* App wrapper, to ensure nothing is injected in the "overlay", by Next.js for example */}
        <div
          id="app"
          className="container mx-auto flex h-full flex-col gap-2 p-2"
        >
          {/* Main content */}
          <div className="h-full overflow-hidden rounded-xl bg-base-200 shadow-[inset_0_0_0.5rem_0_hsl(0deg_0%_0%_/_12%)] dark:bg-base-100">
            {/* Children <div/> just to prevent the scrollbar overflowing the rounded container */}
            <div className="h-full overflow-auto">{children}</div>
          </div>

          {/* Footer */}
          <div className="z-10 flex justify-end gap-4 p-2 px-4 sm:self-end">
            <ThemeSelector />
            <VerticalDivider />

            <a
              href="https://github.com/MaoDeMatos/the-food-wheel"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-outline btn-sm flex items-center justify-center p-1"
              title="Check out the code here !"
            >
              <Github />
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

function VerticalDivider() {
  return <div className="h-8 w-px bg-neutral-content" />;
}

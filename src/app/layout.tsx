import { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
// import Script from 'next/script';

import './globals.css';
import { GitHub } from 'react-feather';
import { ThemeSelector } from './ThemeSelector';

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
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#282a36' },
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
      className={`${work_sans.variable} m-0 h-full p-0 bg-black`}
      suppressHydrationWarning
    >
      {/* <head /> will contain components hydrated by the metadata constant.
       * Find out more at https://beta.nextjs.org/docs/api-reference/metadata */}
      <head>
        {/* TODO: <Script /> does NOT work yet, use a better method when available */}
        {/* <Script
          id="init-theme"
          src="/scripts/initTheme.min.js"
          strategy="beforeInteractive"
        /> */}
        <script
          id="init-theme"
          type="text/javascript"
          src="/scripts/initTheme.min.js"
          async
        />
      </head>

      <body className="antialiased h-full">
        {/* App wrapper, to ensure nothing is injected in the "overlay", by Next.js for example */}
        <div
          id="app"
          className="container mx-auto flex flex-col gap-2 h-full p-2"
        >
          {/* Main content */}
          <div className="h-full overflow-hidden rounded-xl bg-base-100">
            {/* Children <div/> just to prevent the scrollbar overflowing the rounded container */}
            <div className="h-full overflow-auto">{children}</div>
          </div>

          {/* Footer */}
          <div className="z-10 flex justify-end gap-4 bg-base-100 p-2 px-4 rounded-xl sm:self-end">
            <ThemeSelector />
            <VerticalDivider />

            <a
              href="https://github.com/MaoDeMatos/the-food-wheel"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sm btn-circle btn-outline btn flex items-center justify-center p-1"
              title="Check out the code here !"
            >
              <GitHub />
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

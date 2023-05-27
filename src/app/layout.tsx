import { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
// import Script from 'next/script';

// import '../build/styles.css'; // Used when Turbopack is enabled
import './globals.css'; // Used when Turbopack is disabled

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
      className={`${work_sans.variable} m-0 min-h-screen p-0 bg-black`}
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

      <body className="antialiased min-h-screen p-1.5">
        <div className="h-[calc(100vh-0.75rem)] overflow-auto rounded-3xl bg-base-100">
          {children}
        </div>
      </body>
    </html>
  );
}

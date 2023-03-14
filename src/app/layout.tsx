import { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

// import '../build/styles.css'; // Used when Turbopack is enabled
import './globals.css'; // Used when Turbopack is disabled

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

const work_sans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${work_sans.variable}`}>
      {/* <head /> will contain components hydrated by the metadata constant. Find out more at https://beta.nextjs.org/docs/api-reference/metadata */}
      <head />
      <body>{children}</body>
    </html>
  );
}

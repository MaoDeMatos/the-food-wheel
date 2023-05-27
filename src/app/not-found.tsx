import Marquee from '@/components/Marquee';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8 py-12 text-7xl font-bold !leading-tight sm:gap-12 sm:py-14 sm:text-9xl">
      <Marquee autoFill speed={75}>
        <h2 className="px-4">Page not found.</h2>
      </Marquee>
      <div className="h-0.5 w-full bg-gradient-to-r from-primary to-accent" />
      <Marquee autoFill speed={25}>
        {/* Broken in dev mode, but works in production */}
        <Link
          href="/"
          className="bg-gradient-to-r from-primary to-accent bg-clip-text px-4 font-extrabold text-transparent"
        >
          Go back home.
        </Link>
      </Marquee>
      <div className="h-0.5 w-full bg-gradient-to-r from-accent to-primary" />
      <Marquee autoFill speed={50}>
        <h2 className="px-4">Page not found.</h2>
      </Marquee>
    </main>
  );
}

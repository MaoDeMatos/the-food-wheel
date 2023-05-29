import Marquee from '@/components/Marquee';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center py-8 font-bold sm:py-12 text-6xl leading-[inherit]">
      <Marquee autoFill speed={95} className="overflow-visible">
        <h2 className="px-8 text-primary">Error 404</h2>
      </Marquee>

      <div className="my-2 h-0.5 w-full bg-gradient-to-r from-primary to-accent" />

      <Marquee autoFill pauseOnHover direction="right" speed={25}>
        {/* Broken in dev mode, but works in production */}
        <Link
          href="/"
          className="bg-gradient-to-r from-primary to-accent bg-clip-text px-4 font-extrabold text-transparent"
        >
          Go back home.
        </Link>
      </Marquee>

      <div className="my-2 h-0.5 w-full bg-gradient-to-r from-accent to-primary" />

      <Marquee autoFill speed={40}>
        <h2 className="px-4">Page not found.</h2>
      </Marquee>
    </main>
  );
}

import Link from 'next/link';
import { ReactNode } from 'react';

import Marquee from './Marquee';

type ErrorPageProps = {
  topRow: string;
  middleRowActionJSX?: ReactNode;
  bottomRow: string;
};

export const $defaultActionClasses =
  'bg-gradient-to-r from-primary to-secondary bg-clip-text px-4 font-extrabold text-transparent';

const defaultAction = (
  <Link href="/" className={$defaultActionClasses}>
    Go back home.
  </Link>
);

export default function ErrorPage({
  topRow,
  middleRowActionJSX = defaultAction,
  bottomRow,
}: ErrorPageProps) {
  return (
    <main className="flex h-full flex-col items-center justify-center py-8 text-6xl font-bold leading-[inherit] sm:py-12">
      <Marquee autoFill speed={95} className="overflow-visible">
        <h2 className="px-8 text-primary">{topRow}</h2>
      </Marquee>

      <div className="my-2 h-0.5 w-full bg-gradient-to-r from-primary to-secondary" />

      <Marquee autoFill pauseOnHover direction="right" speed={25}>
        {middleRowActionJSX}
      </Marquee>

      <div className="my-2 h-0.5 w-full bg-gradient-to-r from-secondary to-primary" />

      <Marquee autoFill speed={40}>
        <h2 className="px-8">{bottomRow}</h2>
      </Marquee>
    </main>
  );
}

'use client';
import { SVG_COLORS } from '../constants';
// import Image from 'next/image';

import { useDataStoreAsync } from '../DataStore';

export function Wheel() {
  const { options } = useDataStoreAsync();

  return (
    <div className="aspect-square w-full overflow-hidden rounded-full shadow-xl sm:w-72 md:w-96">
      <SvgWheel optionsCount={options.filter(Boolean).length} />
      {/* <div className="h-full w-full bg-base-100/50 backdrop-blur-sm" /> */}
      {/* <Image src="/placeholder.jpg" alt="" className="object-contain" fill /> */}
    </div>
  );
}

type SvgWheelProps = { optionsCount: number };

function SvgWheel({ optionsCount }: SvgWheelProps) {
  const percentage = (1 / optionsCount) * 100;
  const deg = (1 / optionsCount) * 360;
  const dashLength = ((percentage * Math.PI * 10) / 100).toFixed(2);

  // console.log({ deg });

  const sections = [...new Array(optionsCount)].map((opt, idx) => {
    return (
      <circle
        key={idx}
        r="5"
        cx="10"
        cy="10"
        style={{
          fill: 'transparent',
          strokeWidth: 10,
          transform: `rotate(${(-90 + deg * idx).toFixed(2)}deg)`,
          strokeDasharray: `${dashLength} ${(Math.PI * 10).toFixed(2)}`,
        }}
        className={`${SVG_COLORS[idx]} origin-center transition-all`}
      />
    );
  });

  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      className="h-full w-full rounded-full"
    >
      <circle
        r="10"
        cx="10"
        cy="10"
        className="fill-neutral transition-colors"
      />
      {sections}
    </svg>
  );
}

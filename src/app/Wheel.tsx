'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'react-feather';
import { SVG_COLORS } from '../constants';
import { useDataStoreAsync } from '../DataStore';

export function Wheel() {
  const { options } = useDataStoreAsync();
  const optionsCount = options.filter(Boolean).length;

  return (
    <div className="relative flex aspect-square w-full items-center justify-center rounded-full bg-neutral text-center text-neutral-content shadow-xl sm:w-72 md:w-96">
      {optionsCount ? (
        <ArrowDown className="absolute left-1/2 -top-11 h-12 w-12 -translate-x-1/2" />
      ) : null}

      {optionsCount ? (
        <SvgWheel optionsCount={optionsCount} />
      ) : (
        <p className="text-2xl">
          Add two options
          <br /> to spin the wheel !
        </p>
      )}
      {/* <Image src="/placeholder.jpg" alt="" className="object-contain" fill /> */}
    </div>
  );
}

type SvgWheelProps = { optionsCount: number };

function SvgWheel({ optionsCount }: SvgWheelProps) {
  const deg = (1 / optionsCount) * 360;
  const dashLength = ((1 / optionsCount) * Math.PI * 10).toFixed(2);

  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 20 20"
      className="h-full w-full -rotate-90 rounded-full"
    >
      <circle
        r="10"
        cx="10"
        cy="10"
        className="fill-transparent transition-colors"
      />
      {[...new Array(optionsCount)]
        .map((opt, idx) => {
          return (
            <Section key={idx} index={idx} dashLength={dashLength} deg={deg} />
          );
        })
        .reverse()}
    </svg>
  );
}

type SectionProps = {
  index: number;
  deg: number;
  dashLength: string;
};

function Section({ index, deg, dashLength }: SectionProps) {
  const [isInitialRender, setInitialRender] = useState(true);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  return (
    <circle
      r="5"
      cx="10"
      cy="10"
      style={{
        transform: isInitialRender
          ? `rotate(360deg)`
          : `rotate(${(deg * index).toFixed(2)}deg)`,
        strokeDasharray: `${dashLength} ${(Math.PI * 10).toFixed(2)}`,
      }}
      className={`${SVG_COLORS[index]} origin-center fill-transparent stroke-[10] transition-all duration-300`}
    />
  );
}

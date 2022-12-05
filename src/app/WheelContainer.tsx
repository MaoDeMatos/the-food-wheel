'use client';

import { memo, useEffect, useState } from 'react';
import { ArrowDown } from 'react-feather';
import { SVG_COLORS } from '../constants';
import { changeWheelStatus, useDataStoreAsync } from '../DataStore';

export function WheelContainer() {
  const { wheelStatus, initialSpeed, slowdownTime, options } =
    useDataStoreAsync();
  const [localRotation, setLocalRotation] = useState(0);
  const [localDuration, setLocalDuration] = useState(0);
  const [result, setResult] = useState('');

  useEffect(() => {
    let timeout = setTimeout(() => {}, 1);

    if (wheelStatus === 'spinning') {
      if (localRotation) {
        setLocalDuration(0.3);
        setLocalRotation(0);
        changeWheelStatus('ready');
      } else {
        const randomRotation = Math.round(Math.random() * 360);
        const arrowPos = 360 - randomRotation;

        const optionsCount = options.filter(Boolean).length;
        const sectionSize = (1 / optionsCount) * 360;
        const sections = [...new Array(optionsCount)].map((_, idx) => [
          idx * sectionSize,
          (idx + 1) * sectionSize - 1,
        ]);
        const targetSectionIdx = sections.findIndex(
          (el) => el[0] <= arrowPos && arrowPos < el[1]
        );

        setLocalDuration(0);
        setLocalRotation(randomRotation + initialSpeed * 360 * slowdownTime);

        timeout = setTimeout(() => {
          setResult(options[targetSectionIdx]);
          changeWheelStatus('stopped');
        }, slowdownTime * 1000);
      }
    }

    // Component cleanup to destroy the timeout
    return () => clearTimeout(timeout);
  }, [wheelStatus]);

  return (
    <div className="relative flex w-full flex-col gap-8 text-center sm:w-72 md:w-96">
      <ArrowDown className="absolute left-1/2 -top-11 h-12 w-12 -translate-x-1/2" />
      {/* <button
        type="button"
        className="btn-circle btn absolute right-0 -top-0 z-[1]"
      >
        <Edit2 />
      </button> */}

      <div
        style={{
          transform: `rotate(${localRotation}deg)`,
          transitionDuration: `${
            localDuration ? localDuration : slowdownTime
          }s`,
        }}
        className="aspect-square w-full items-center justify-center rounded-full bg-neutral text-neutral-content shadow-xl transition-all ease-out"
      >
        <SvgWheel />
        {/* <Image src="/placeholder.jpg" alt="" className="object-contain" fill /> */}
      </div>

      <p className="bg-gradient-to-r from-primary to-accent bg-clip-text text-center text-2xl font-extrabold text-transparent sm:text-4xl">
        {result}
      </p>
    </div>
  );
}

// type SvgWheelProps = { optionsCount: number };

// function SvgWheel({ optionsCount }: SvgWheelProps) {
const SvgWheel = memo(function SvgWheel() {
  const { options } = useDataStoreAsync();
  const optionsCount = options.filter(Boolean).length;
  const count = optionsCount > 1 ? optionsCount : 1;

  const deg = (1 / count) * 360;
  const dashLength = ((1 / count) * Math.PI * 10).toFixed(2);

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
      {[...new Array(count)]
        .map((opt, idx) => {
          return (
            <Section key={idx} index={idx} dashLength={dashLength} deg={deg} />
          );
        })
        .reverse()}
    </svg>
  );
});

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

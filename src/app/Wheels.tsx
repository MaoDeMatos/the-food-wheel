import Image from 'next/image';
import { memo, useState, useEffect } from 'react';
import { SVG_COLORS } from '../constants';
import { useDataStoreAsync } from '../DataStore';

export const ImageWheel = memo(function ImageWheel() {
  const { image } = useDataStoreAsync();

  return image ? (
    <div className="relative h-full w-full overflow-hidden rounded-full border border-primary">
      <Image src={image} alt="" fill className="object-cover" />
    </div>
  ) : null;
});

export const SvgWheel = memo(function SvgWheel() {
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
        .map((_, idx) => {
          return (
            <SvgWheelSection
              key={idx}
              index={idx}
              dashLength={dashLength}
              deg={deg}
            />
          );
        })
        .reverse()}
    </svg>
  );
});

type SvgWheelSectionProps = {
  index: number;
  deg: number;
  dashLength: string;
};

function SvgWheelSection({ index, deg, dashLength }: SvgWheelSectionProps) {
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

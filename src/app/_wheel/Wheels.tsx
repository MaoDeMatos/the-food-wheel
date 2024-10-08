import Image from 'next/image';
import { memo } from 'react';

import { SVG_COLORS } from '@/utils/constants';
import { useIsMounted } from '@/utils/useIsMounted';
import { useWheelMachineContext } from '@/utils/wheelMachine';

type hasImage = { image: string | null };

export const ImageWheel = memo(function ImageWheel({ image }: hasImage) {
  return image ? (
    <div className="relative h-full w-full overflow-hidden rounded-full border border-primary">
      <Image src={image} alt="" fill className="object-cover" />
    </div>
  ) : null;
});

export const SvgWheel = () => {
  const [
    {
      context: { options },
    },
  ] = useWheelMachineContext();

  const optionsCount = options.filter(Boolean).length;
  const count = optionsCount || 1;

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
        .map((_, index) => {
          return (
            <SvgWheelSection key={index} {...{ index, dashLength, deg }} />
          );
        })
        .reverse()}
    </svg>
  );
};

type SvgWheelSectionProps = {
  index: number;
  deg: number;
  dashLength: string;
};

function SvgWheelSection({ index, deg, dashLength }: SvgWheelSectionProps) {
  const isAlreadyMounted = useIsMounted();

  return (
    <circle
      r="5"
      cx="10"
      cy="10"
      style={{
        transform: !isAlreadyMounted
          ? `rotate(360deg)`
          : `rotate(${(deg * index).toFixed(2)}deg)`,
        strokeDasharray: `${dashLength} ${(Math.PI * 10).toFixed(2)}`,
      }}
      className={`${SVG_COLORS[index]} origin-center fill-transparent stroke-[10] transition-all duration-300`}
    />
  );
}

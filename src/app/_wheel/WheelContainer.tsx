import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { wheelMachineContext } from '@/utils/wheelMachine';

import { ChangeWheelImage } from './ChangeWheelImage';
import { ImageWheel, SvgWheel } from './Wheels';

export function WheelContainer() {
  const [
    {
      value: wheelState,
      matches: wheelStateMatches,
      context: { initialSpeed, slowdownTime, options, result },
    },
    send,
  ] = wheelMachineContext.useActor();

  const calcResult = useRef('');
  // We need a local duration value to avoid using `slowdownTime` as reset duration on our wheel
  const [[displayDuration, displayRotation], setDisplayValues] = useState([
    0, 0,
  ]);

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    switch (true) {
      case wheelStateMatches('spinning'):
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
        const result = options[targetSectionIdx];

        setDisplayValues([
          0,
          randomRotation + initialSpeed * 360 * slowdownTime,
        ]);
        calcResult.current = result;
        break;

      case wheelStateMatches('reset'):
        setDisplayValues([0.1, 0]);
        calcResult.current = '';
        break;

      case !['reset', 'spinning'].some(wheelStateMatches):
        send({
          type: 'UPDATE_CONTEXT',
          value: { result: calcResult.current },
        });
        break;

      default:
        break;
    }
  }, [wheelState]);

  return (
    <div className="relative flex w-full flex-col gap-8 text-center sm:w-72 md:w-96">
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <ArrowDown className="h-12 w-12" />
        <ChangeWheelImage
          image={image}
          setImage={(newImage) => {
            setImage(newImage);
          }}
        />
        <div
          style={{
            transform: `rotate(${displayRotation}deg)`,
            transitionDuration: `${
              displayDuration ? displayDuration : slowdownTime
            }s`,
          }}
          className="aspect-square w-full items-center justify-center rounded-full bg-neutral text-neutral-content transition-transform ease-out"
        >
          {image ? <ImageWheel image={image} /> : <SvgWheel />}
        </div>
      </div>
      <p className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-center text-2xl font-extrabold !leading-snug text-transparent sm:text-4xl">
        {result}
      </p>
    </div>
  );
}

import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useWheelMachineContext } from '@/utils/wheelMachine';

import { ChangeWheelImage } from './ChangeWheelImage';
import { ImageWheel, SvgWheel } from './Wheels';

export function WheelContainer() {
  const [machine, send] = useWheelMachineContext();

  const {
    value: wheelState,
    context: { initialSpeed, slowdownTime, options, result },
  } = machine;

  const calcResult = useRef('');
  // We need a local duration value to avoid using `slowdownTime` as reset duration on our wheel
  const [[displayDuration, displayRotation], setDisplayValues] = useState([
    0, 0,
  ]);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (machine.matches('spinning')) {
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

      setDisplayValues([0, randomRotation + initialSpeed * 360 * slowdownTime]);
      calcResult.current = result;
    } else if (machine.matches('reset')) {
      setDisplayValues([0.1, 0]);
      calcResult.current = '';
    } else if (!machine.matches('reset') && !machine.matches('spinning')) {
      send({
        type: 'UPDATE_CONTEXT',
        value: { result: calcResult.current },
      });
    }
  }, [wheelState]);

  return (
    <div className="relative flex w-full flex-col gap-8 text-center sm:w-72 md:w-96">
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <ArrowDown className="size-12" />
        <ChangeWheelImage image={image} setImage={setImage} />
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

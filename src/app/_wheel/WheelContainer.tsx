'use client';

import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { changeWheelStatus, useDataStoreAsync } from '@/utils/DataStore';

import { ChangeWheelImage } from './ChangeWheelImageButton';
import { ImageWheel, SvgWheel } from './Wheels';

export function WheelContainer() {
  const { wheelStatus, initialSpeed, slowdownTime, options, image } =
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
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <ArrowDown className="h-12 w-12" />
        <ChangeWheelImage />
        <div
          style={{
            transform: `rotate(${localRotation}deg)`,
            transitionDuration: `${
              localDuration ? localDuration : slowdownTime
            }s`,
          }}
          className="aspect-square w-full items-center justify-center rounded-full bg-neutral text-neutral-content transition-all ease-out"
        >
          {image ? <ImageWheel /> : <SvgWheel />}
        </div>
      </div>
      <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-2xl font-extrabold !leading-snug text-transparent sm:text-4xl">
        {result}
      </p>
    </div>
  );
}

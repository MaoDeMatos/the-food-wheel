'use client';

import { useSnapshot } from 'valtio';
import { CustomSliderComponent } from '../components/Sliders';
import { setInitialSpeed, setSlowdownSpeed, dataStore } from '../DataStore';

export function LeftMenu() {
  return (
    <div className="card card-compact w-full bg-base-300 sm:w-56">
      <div className="card-body">
        <LeftMenuConfig />
        <LeftMenuOptions />
      </div>
    </div>
  );
}

function LeftMenuConfig() {
  const { initialSpeed, slowdownSpeed } = useSnapshot(dataStore, {
    sync: true,
  });

  return (
    <div>
      <p className="font-bold">Configuration</p>

      <CustomSliderComponent
        label="Initial speed :"
        value={initialSpeed}
        handleValueChanges={(newVal: number) => {
          setInitialSpeed(newVal);
        }}
        min={1}
        max={9}
        withCarets
      />
      <CustomSliderComponent
        label="Slowdown speed :"
        value={slowdownSpeed}
        handleValueChanges={(newVal: number) => {
          setSlowdownSpeed(newVal);
        }}
        min={1}
        max={20}
      />
    </div>
  );
}

function LeftMenuOptions() {
  // const { options } = useSnapshot(dataStore, { sync: true });

  return (
    <div>
      <p>Options</p>

      <p>McDonalds</p>
      <p className="line-through">Add a new choice</p>
    </div>
  );
}

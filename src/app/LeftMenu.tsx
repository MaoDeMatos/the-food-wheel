'use client';

import { Plus, X } from 'react-feather';
import { CustomSliderComponent } from '../components/Sliders';
import {
  optionsActions,
  setInitialSpeed,
  setSlowdownSpeed,
  useDataStoreSync,
} from '../DataStore';

export function LeftMenu() {
  return (
    <div className="card card-compact w-full bg-base-300 sm:w-56">
      <div className="card-body gap-6">
        <LeftMenuConfig />
        <LeftMenuOptions />
      </div>
    </div>
  );
}

function LeftMenuConfig() {
  const { initialSpeed, slowdownSpeed } = useDataStoreSync();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">Configuration</p>

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
  const { options } = useDataStoreSync();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">Options</p>

      {options.map((opt, idx) => (
        <div key={idx} className="relative">
          <span className="pointer-events-none absolute top-[52%] left-3 -translate-y-1/2 select-none">
            {idx + 1}.
          </span>
          <input
            type="text"
            placeholder="Pizza ?"
            className="input-bordered input input-md w-full pl-7 pr-8"
            value={opt}
            onChange={(e) =>
              optionsActions.updateOptionValue(idx, e.target.value)
            }
          />
          <X
            className="absolute top-[52%] right-1.5 z-[1] h-6 w-6 -translate-y-1/2 cursor-pointer rounded-full p-1 ring-current transition hover:ring-2"
            onClick={() => optionsActions.removeOptionById(idx)}
          />
        </div>
      ))}

      {options.length <= 16 && (
        <button
          className="btn w-full gap-2"
          type="button"
          onClick={() => optionsActions.addOption()}
        >
          <Plus />
          Add
        </button>
      )}
    </div>
  );
}

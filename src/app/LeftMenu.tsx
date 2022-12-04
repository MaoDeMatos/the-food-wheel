'use client';

import { Plus, X } from 'react-feather';
import { CustomSliderComponent } from '../components/Sliders';
import { INITIAL_SPEED, OPTIONS, SLOWDOWN_SPEED } from '../constants';
import {
  optionsActions,
  setInitialSpeed,
  setSlowdownSpeed,
  useDataStoreSync,
} from '../DataStore';

export function LeftMenu() {
  return (
    <div className="card card-compact w-full bg-neutral text-neutral-content shadow-md sm:w-56">
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
        label="Initial speed (turns/sec) :"
        value={initialSpeed}
        handleValueChanges={(newVal: number) => {
          setInitialSpeed(newVal);
        }}
        min={INITIAL_SPEED.MIN}
        max={INITIAL_SPEED.MAX}
        withCarets
      />
      <CustomSliderComponent
        label="Slowdown time (seconds) :"
        value={slowdownSpeed}
        handleValueChanges={(newVal: number) => {
          setSlowdownSpeed(newVal);
        }}
        min={SLOWDOWN_SPEED.MIN}
        max={SLOWDOWN_SPEED.MAX}
      />
    </div>
  );
}

function LeftMenuOptions() {
  const { options } = useDataStoreSync();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">
        Options <span className="text-xs italic">({OPTIONS.MAX} max.)</span>
      </p>

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

      {options.length < OPTIONS.MAX && (
        <button
          className="btn-primary btn w-full gap-2"
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

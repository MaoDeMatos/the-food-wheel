'use client';

import { Plus } from 'lucide-react';

import { CustomSliderComponent } from '@/components/Sliders';
import {
  optionsActions,
  setInitialSpeed,
  setslowdownTime,
  useDataStoreSync,
} from '@/utils/DataStore';
import { INITIAL_SPEED, SLOWDOWN_TIME } from '@/utils/constants';

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

const MAX_OPTIONS_NUMBER = 9;

function LeftMenuConfig() {
  const { initialSpeed, slowdownTime } = useDataStoreSync();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">Configuration</p>

      <CustomSliderComponent
        label="Initial speed (turns/sec) :"
        value={initialSpeed}
        isValueVisible={false}
        handleValueChanges={(newVal: number) => {
          setInitialSpeed(newVal);
        }}
        min={INITIAL_SPEED.MIN}
        max={INITIAL_SPEED.MAX}
        withCarets
      />
      <CustomSliderComponent
        label="Slowdown time (seconds) :"
        value={slowdownTime}
        handleValueChanges={(newVal: number) => {
          setslowdownTime(newVal);
        }}
        min={SLOWDOWN_TIME.MIN}
        max={SLOWDOWN_TIME.MAX}
      />
    </div>
  );
}

function LeftMenuOptions() {
  const { options, wheelStatus } = useDataStoreSync();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">
        Options{' '}
        <span className="text-xs italic">({MAX_OPTIONS_NUMBER} max.)</span>
      </p>

      {options.map((opt, idx) => (
        <div key={idx} className="relative">
          <span className="pointer-events-none absolute left-3 top-[52%] -translate-y-1/2 select-none">
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
            disabled={wheelStatus === 'spinning'}
          />
          <button
            type="button"
            className="absolute right-1.5 top-[52%] z-[1] flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full p-1 ring-current transition hover:ring-2 disabled:cursor-not-allowed disabled:hover:ring-0"
            onClick={() => optionsActions.removeOptionById(idx)}
            disabled={wheelStatus === 'spinning'}
          >
            ✕
          </button>
        </div>
      ))}

      {options.length < MAX_OPTIONS_NUMBER && (
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

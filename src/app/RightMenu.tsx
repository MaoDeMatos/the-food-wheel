'use client';

import { Play } from 'react-feather';
import { BADGES_COLORS, INITIAL_SPEED, SLOWDOWN_SPEED } from '../constants';
import { useDataStoreAsync } from '../DataStore';

export function RightMenu() {
  return (
    <div className="w-full space-y-4 sm:w-56">
      <SpinTheWheelButton />
      <RightMenuCaptions />
    </div>
  );
}

function SpinTheWheelButton() {
  const { initialSpeed, slowdownSpeed, options } = useDataStoreAsync();

  const filteredOptions = options.filter(Boolean);

  const isInitialSpeedInRange =
    INITIAL_SPEED.MIN <= initialSpeed && initialSpeed <= INITIAL_SPEED.MAX;
  const isSlowdownSpeedsInRange =
    SLOWDOWN_SPEED.MIN <= slowdownSpeed && slowdownSpeed <= SLOWDOWN_SPEED.MAX;
  const thereAreEnoughOptions = filteredOptions.length >= 2;

  const canSpinTheWheel =
    isInitialSpeedInRange && isSlowdownSpeedsInRange && thereAreEnoughOptions;

  function spinTheWheel() {
    console.info('And the wheel spins !');
  }

  function handleErrors() {
    console.error('One or mutiple errors occured :');

    // const errors: string[] = [];

    if (!isInitialSpeedInRange) {
      console.error(
        `"initialSpeed" is not in range. initialSpeed: ${initialSpeed}`
      );
    }
    if (!isSlowdownSpeedsInRange) {
      console.error(
        `"slowdownSpeed" is not in range. slowdownSpeed: ${slowdownSpeed}`
      );
    }
    if (!thereAreEnoughOptions) {
      console.error(
        `Error with options count. Options count ${filteredOptions.length}`
      );
    }
  }

  return (
    <button
      className="btn-accent btn-circle btn w-full gap-2 shadow-md transition disabled:pointer-events-auto disabled:cursor-not-allowed disabled:shadow-sm"
      type="button"
      onClick={canSpinTheWheel ? spinTheWheel : handleErrors}
      disabled={!canSpinTheWheel}
    >
      <Play />
      Spin the wheel !
    </button>
  );
}

function RightMenuCaptions() {
  const { options } = useDataStoreAsync();

  // const filteredOptions = useMemo(() => options.filter(Boolean), [options]);
  const filteredOptions = options.filter(Boolean);

  return (
    <div className="card card-compact w-full bg-neutral text-neutral-content shadow-md">
      <div className="card-body">
        <p className="text-lg font-bold">Caption</p>

        {filteredOptions.length < 1 && (
          <p className="italic">No option entered.</p>
        )}

        {filteredOptions.length
          ? filteredOptions.map((opt, idx) => (
              <div key={idx} className="flex items-center">
                <p
                  className={`mr-2 h-3 w-3 shrink-0 grow-0 rounded-full shadow ${BADGES_COLORS[idx]}`}
                />
                <p className="truncate">{`${idx + 1}. ${opt}`}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

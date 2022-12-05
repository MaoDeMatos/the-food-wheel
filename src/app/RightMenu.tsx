'use client';

import { FastForward, Play } from 'react-feather';
import { BADGES_COLORS, INITIAL_SPEED, SLOWDOWN_TIME } from '../constants';
import { changeWheelStatus, useDataStoreAsync } from '../DataStore';

export function RightMenu() {
  return (
    <div className="w-full space-y-4 sm:w-56">
      <SpinTheWheelButton />
      <RightMenuCaptions />
    </div>
  );
}

function SpinTheWheelButton() {
  const { wheelStatus, initialSpeed, slowdownTime, options } =
    useDataStoreAsync();

  const filteredOptions = options.filter(Boolean);

  const isInitialSpeedInRange =
    INITIAL_SPEED.MIN <= initialSpeed && initialSpeed <= INITIAL_SPEED.MAX;
  const isslowdownTimesInRange =
    SLOWDOWN_TIME.MIN <= slowdownTime && slowdownTime <= SLOWDOWN_TIME.MAX;
  const thereAreEnoughOptions = filteredOptions.length >= 2;

  const canSpinTheWheel =
    wheelStatus !== 'spinning' &&
    isInitialSpeedInRange &&
    isslowdownTimesInRange &&
    thereAreEnoughOptions;

  function handleErrors() {
    console.error('One or mutiple errors occured :');

    // const errors: string[] = [];

    if (!isInitialSpeedInRange) {
      console.error(
        `"initialSpeed" is not in range. initialSpeed: ${initialSpeed}`
      );
    }
    if (!isslowdownTimesInRange) {
      console.error(
        `"slowdownTime" is not in range. slowdownTime: ${slowdownTime}`
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
      onClick={
        canSpinTheWheel ? () => changeWheelStatus('spinning') : handleErrors
      }
      disabled={!canSpinTheWheel}
    >
      {wheelStatus === 'ready' ? (
        <>
          <Play />
          Spin the wheel !
        </>
      ) : (
        <>
          <FastForward className="rotate-180" />
          Reset
        </>
      )}
    </button>
  );
}

function RightMenuCaptions() {
  const { options } = useDataStoreAsync();
  const filteredOptions = options.filter(Boolean);

  return (
    <div className="card card-compact w-full bg-neutral text-neutral-content shadow-md">
      <div className="card-body">
        <p className="text-lg font-bold">Caption</p>

        {filteredOptions.length < 2 && (
          <p className="italic">Add at least two options to spin the wheel !</p>
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

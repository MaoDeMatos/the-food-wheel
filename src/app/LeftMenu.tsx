import { useEffect } from 'react';

import { CustomSliderComponent } from '@/components/Sliders';
import { INITIAL_SPEED, SLOWDOWN_TIME } from '@/utils/constants';
import { useWheelMachineContext } from '@/utils/wheelMachine';

export function LeftMenu() {
  return (
    <div className="card card-compact w-full border bg-base-100 shadow-md dark:border-transparent dark:bg-neutral dark:text-neutral-content sm:w-56">
      <div className="card-body gap-6">
        <LeftMenuConfig />
        <LeftMenuOptions />
      </div>
    </div>
  );
}

const MAX_OPTIONS_NUMBER = 9;

function LeftMenuConfig() {
  const [
    {
      context: { slowdownTime, initialSpeed },
    },
    send,
  ] = useWheelMachineContext();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">Configuration</p>

      <CustomSliderComponent
        label="Initial speed (turns/sec) :"
        value={initialSpeed}
        isValueVisible={false}
        handleValueChanges={(newVal: number) => {
          send({
            type: 'UPDATE_CONTEXT',
            value: { initialSpeed: newVal },
          });
        }}
        min={INITIAL_SPEED.MIN}
        max={INITIAL_SPEED.MAX}
        withCarets
      />
      <CustomSliderComponent
        label="Slowdown time (seconds) :"
        value={slowdownTime}
        handleValueChanges={(newVal: number) => {
          send({
            type: 'UPDATE_CONTEXT',
            value: { slowdownTime: newVal },
          });
        }}
        min={SLOWDOWN_TIME.MIN}
        max={SLOWDOWN_TIME.MAX}
      />
    </div>
  );
}

function LeftMenuOptions() {
  const [machine, send] = useWheelMachineContext();

  const {
    context: { options },
  } = machine;

  const disabled = machine.matches('reset') || machine.matches('spinning');

  useEffect(() => {
    const hasEmptyInput = options.some((val) => !val);

    if (!hasEmptyInput && options.length < MAX_OPTIONS_NUMBER) {
      send({ type: 'OPTIONS.ADD' });
    }
  }, [options]);

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">
        Options{' '}
        <span className="text-xs italic">({MAX_OPTIONS_NUMBER} max.)</span>
      </p>

      <div className="join join-vertical isolate w-full border shadow dark:border-transparent">
        {options.map((opt, idx) => (
          <div
            key={idx}
            className="input join-item input-ghost input-md relative w-full p-0 focus-within:z-10"
          >
            <span className="pointer-events-none absolute left-3 top-[52%] z-10 -translate-y-1/2 select-none">
              {idx + 1}.
            </span>
            <input
              type="text"
              placeholder="Pizza ?"
              className="input join-item input-md w-full pl-7 pr-8"
              value={opt}
              disabled={disabled}
              onChange={(e) =>
                send({
                  type: 'OPTIONS.CHANGE',
                  id: idx,
                  value: e.target.value,
                })
              }
            />
            {options.length - 1 === idx ? null : (
              <button
                type="button"
                className="absolute right-1.5 top-[52%] z-[1] flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full p-1 ring-current transition hover:ring-2 disabled:cursor-not-allowed disabled:hover:ring-0"
                disabled={disabled}
                onClick={() => {
                  send({ type: 'OPTIONS.REMOVE', id: idx });
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

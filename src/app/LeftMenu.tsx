import { Plus } from 'lucide-react';

import { CustomSliderComponent } from '@/components/Sliders';
import { INITIAL_SPEED, SLOWDOWN_TIME } from '@/utils/constants';
import { wheelMachineContext } from '@/utils/state';

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
  const [{ context }, send] = wheelMachineContext.useActor();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">Configuration</p>

      <CustomSliderComponent
        label="Initial speed (turns/sec) :"
        value={context.initialSpeed}
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
        value={context.slowdownTime}
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
  const [wheelState, send] = wheelMachineContext.useActor();

  return (
    <div className="space-y-4">
      <p className="text-lg font-bold">
        Options{' '}
        <span className="text-xs italic">({MAX_OPTIONS_NUMBER} max.)</span>
      </p>

      {wheelState.context.options.map((opt, idx) => (
        <div key={idx} className="relative">
          <span className="pointer-events-none absolute left-3 top-[52%] -translate-y-1/2 select-none">
            {idx + 1}.
          </span>
          <input
            type="text"
            placeholder="Pizza ?"
            className="input input-bordered input-md w-full pl-7 pr-8"
            value={opt}
            disabled={['reset', 'spinning'].some(wheelState.matches)}
            onChange={(e) =>
              send({
                type: 'OPTIONS.CHANGE',
                id: idx,
                value: e.target.value,
              })
            }
          />

          {wheelState.context.options.length > 1 ? (
            <button
              type="button"
              className="absolute right-1.5 top-[52%] z-[1] flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full p-1 ring-current transition hover:ring-2 disabled:cursor-not-allowed disabled:hover:ring-0"
              disabled={['reset', 'spinning'].some(wheelState.matches)}
              onClick={() => {
                send({ type: 'OPTIONS.REMOVE', id: idx });
              }}
            >
              ✕
            </button>
          ) : null}
        </div>
      ))}

      {wheelState.context.options.length < MAX_OPTIONS_NUMBER && (
        <button
          className="btn btn-primary w-full gap-2"
          type="button"
          disabled={['reset', 'spinning'].some(wheelState.matches)}
          onClick={() => {
            send('OPTIONS.ADD');
          }}
        >
          <Plus />
          Add
        </button>
      )}
    </div>
  );
}

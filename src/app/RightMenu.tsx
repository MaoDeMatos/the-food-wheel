import { Pause, Play } from 'lucide-react';

import { BADGES_COLORS } from '@/utils/constants';
import { useWheelMachineContext } from '@/utils/wheelMachine';

export function RightMenu() {
  return (
    <div className="w-full space-y-4 sm:w-56">
      <SpinTheWheelButton />
      <RightMenuCaptions />
    </div>
  );
}

function SpinTheWheelButton() {
  const [machine, send] = useWheelMachineContext();

  const isSpinnin = machine.matches('reset') || machine.matches('spinning');

  const text = isSpinnin ? 'Stop the wheel' : 'Spin the wheel !';

  return (
    <button
      className="btn btn-circle btn-secondary w-full gap-2 shadow-md transition disabled:pointer-events-auto disabled:cursor-not-allowed disabled:shadow"
      type="button"
      title={text}
      onClick={() =>
        isSpinnin ? send({ type: 'STOP' }) : send({ type: 'SPIN' })
      }
      disabled={isSpinnin ? false : !machine.matches('ready')}
    >
      {isSpinnin ? <Pause /> : <Play />}
      {text}
    </button>
  );
}

function RightMenuCaptions() {
  const [{ context }] = useWheelMachineContext();
  const filteredOptions = context.options.filter(Boolean);

  return (
    <div className="card card-compact w-full border bg-base-100 shadow-md dark:border-transparent dark:bg-neutral dark:text-neutral-content">
      <div className="card-body">
        {filteredOptions.length < 2 && (
          <p className="italic">Add at least two options to spin the wheel !</p>
        )}

        {filteredOptions.length ? (
          <>
            <p className="text-lg font-bold">Caption</p>
            {filteredOptions.map((opt, idx) => (
              <div key={idx} className="flex items-center">
                <p
                  className={`mr-2 h-3 w-3 shrink-0 grow-0 rounded-full shadow ${BADGES_COLORS[idx]}`}
                />
                <p className="truncate">{`${idx + 1}. ${opt}`}</p>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}

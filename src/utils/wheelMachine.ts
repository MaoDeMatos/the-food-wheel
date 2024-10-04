'use client';

import { assign, setup } from 'xstate';

import { INITIAL_SPEED, SLOWDOWN_TIME } from './constants';
import { createMachineContext } from './createMachineContext';

type Option = string;

export type WheelMachineContext = {
  initialSpeed: number;
  slowdownTime: number;
  options: Option[];
  result: Option;
};

export type WheelMachineEvents =
  | { type: 'SPIN' | 'STOP' }
  | { type: 'UPDATE_CONTEXT'; value: Partial<WheelMachineContext> }
  | { type: 'OPTIONS.ADD'; value?: Option }
  | { type: 'OPTIONS.REMOVE'; id: number }
  | { type: 'OPTIONS.CHANGE'; id: number; value: Option };

function canSpin(ctx: WheelMachineContext) {
  const { options, initialSpeed, slowdownTime } = ctx;
  return (
    options.filter(Boolean).length >= 2 &&
    INITIAL_SPEED.MIN <= initialSpeed &&
    initialSpeed <= INITIAL_SPEED.MAX &&
    SLOWDOWN_TIME.MIN <= slowdownTime &&
    slowdownTime <= SLOWDOWN_TIME.MAX
  );
}

const wheelMachine = setup({
  types: {} as {
    context: WheelMachineContext;
    events: WheelMachineEvents;
  },

  delays: {
    STOPPING_DELAY: ({ context }) => context.slowdownTime * 1000,
  },
}).createMachine({
  id: 'WheelMachine',
  context: {
    initialSpeed: 6,
    slowdownTime: 4,
    options: ['KFK 2', 'BK', ''],
    result: '',
  },

  // Global events
  on: {
    UPDATE_CONTEXT: {
      actions: [assign(({ event }) => event?.value)],
    },
    'OPTIONS.ADD': {
      actions: [
        assign(({ context, event }) => {
          return { options: [...context.options, event?.value ?? ''] };
        }),
      ],
    },
    'OPTIONS.REMOVE': {
      actions: [
        assign(({ context, event }) => {
          return { options: [...context.options.toSpliced(event.id, 1)] };
        }),
      ],
    },
    'OPTIONS.CHANGE': {
      actions: [
        assign(({ context, event }) => {
          context.options[event.id] = event.value;
          return { options: [...context.options] };
        }),
      ],
    },
  },

  // States
  initial: 'not ready',

  states: {
    'not ready': {
      always: {
        target: 'ready',
        guard: ({ context }) => canSpin(context),
      },
    },

    ready: {
      always: {
        target: 'not ready',
        guard: ({ context }) => !canSpin(context),
      },
      on: { SPIN: 'reset.spin' },
    },

    spinning: {
      after: { STOPPING_DELAY: 'not ready' },
      on: { STOP: 'reset.stop' },
    },

    reset: {
      initial: 'spin',
      states: {
        spin: { after: { 150: '#WheelMachine.spinning' } },
        stop: { after: { 100: '#WheelMachine.not ready' } },
      },
    },
  },
});

export const wheelMachineContext = createMachineContext(wheelMachine);

export const useWheelMachineContext = wheelMachineContext.useMachineContext;

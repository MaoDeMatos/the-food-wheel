'use client';

import { createActorContext } from '@xstate/react';
import { assign, createMachine } from 'xstate';

import { INITIAL_SPEED, SLOWDOWN_TIME } from './constants';

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

const wheelMachine = createMachine(
  {
    tsTypes: {} as import('./wheelMachine.typegen').Typegen0,
    // Will be `true` by default in version 5.0
    predictableActionArguments: true,
    id: 'Wheel Machine',
    initial: 'not ready',

    schema: {
      context: {} as WheelMachineContext,
      events: {} as WheelMachineEvents,
    },

    context: {
      initialSpeed: 4,
      slowdownTime: 4,
      options: [
        'KFK 2',
        'BK',
        '',
        // ''
      ],
      result: '',
    },

    on: {
      UPDATE_CONTEXT: { actions: ['updateContext'] },
      'OPTIONS.ADD': { actions: ['addOption'] },
      'OPTIONS.REMOVE': { actions: ['removeOption'] },
      'OPTIONS.CHANGE': { actions: ['changeOptionValue'] },
    },

    states: {
      'not ready': {
        always: { target: 'ready', cond: 'canSpin' },
      },

      ready: {
        always: { target: 'not ready', cond: 'cannotSpin' },
        on: { SPIN: 'reset.spin' },
      },

      reset: {
        states: {
          spin: { after: { 150: '#Wheel Machine.spinning' } },
          stop: { after: { 100: '#Wheel Machine.not ready' } },
        },
      },

      spinning: {
        after: { STOPPING_DELAY: 'not ready' },
        on: { STOP: 'reset.stop' },
      },
    },
  },
  // Machine options
  {
    delays: {
      STOPPING_DELAY: (ctx) => ctx.slowdownTime * 1000,
    },
    guards: {
      canSpin: (ctx) => canSpin(ctx),
      cannotSpin: (ctx) => !canSpin(ctx),
    },
    actions: {
      updateContext: assign((_, event) => event.value),
      addOption: assign((ctx, event) => {
        ctx.options.push(event?.value ?? '');
        return { options: ctx.options };
      }),
      removeOption: assign((ctx, event) => {
        ctx.options.splice(event.id, 1);
        return { options: ctx.options };
      }),
      changeOptionValue: assign((ctx, event) => {
        ctx.options[event.id] = event.value;
        return { options: ctx.options };
      }),
    },
  }
);

export const wheelMachineContext = createActorContext(wheelMachine);

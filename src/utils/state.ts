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
    /** @xstate-layout N4IgpgJg5mDOIC5QHUAWYwBsAEBZAhgMaoCWAdmAMQCqACgCICCAKgKID6AwgPIBybADWYBtAAwBdRKAAOAe1gkALiVlkpIAB6IALAGYAbADp9AJgCso0boAcARm36AnAHYTzgDQgAnohOPHhtZmjrrOZgC+4Z5oGDgExORU3LTMAJJ8AMqGjPT0YpJIIHIKyqrqWgjaZrqBog7O+qJmwaLWJp4+CCZWho6iphaWQ5a6kdHoWHhEpBSUyWmZhgBKrLjcAGqs+erFSipqhRV61oa6waHWdg4ubh2ItqLOvdW25mMgMZPxM0kp6bxZTgACUYvAA4lsJDt5HsyocdKFDM5tCZbI5bLp7E5XB5vPcTO9PnFpolDGRZIpsAAnMD4CBeSjbQq7UoHUAVMLaQJ9Rqo2y2Oz6bR3BCNUTcszWXTSmXS7SEibEhIUQw0ukMjK0VK8JkyGGs8qIaz9JFWB58gW2IUi7TOcWYt5RD6KqbKsCq2n0xlQ5n6-aGhCc7n9UQWwXCvEIZpc6yOSWy2Xyp1E10-D2wMCKSgaWCKfCKd34ABmBapAApbBYAJSUFPfUk0jOKXVFP1w9n3Zy2EXBEyGfqO8axVOk2DSchkchQbO5-OFktgcsZZjJLXg9j0VgAGUYAE0a3WSSqxxOpy2Wf74ZUTDU45jdCZTCFHFVdD3HH2BxF3uSIHB1IebrQiUl4dggAC03aRjYfZ2IOzrDvWKrkpSar0sBsJspoiCmEYjjWHoZhhlaEadMEtj9gMCqIUe7poZ0eoge22EIH0XIPnYob8pa1qRs0ZjGFUUoJnK1FfLR6aZhhBpXraPZtL0zjovoKmqSpzhiUqaYnmQk5kFA0mgSxuh1M896Pn4ugvtU74UV+kSREAA */
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
      options: ['KFK 2', "McDo'", ''],
      result: '',
    },

    on: {
      UPDATE_CONTEXT: {
        actions: assign((ctx, event) => event.value),
      },
      'OPTIONS.ADD': {
        actions: assign((ctx, event) => {
          ctx.options.push(event?.value ?? '');

          return { options: ctx.options };
        }),
      },
      'OPTIONS.REMOVE': {
        actions: assign((ctx, event) => {
          ctx.options.splice(event.id, 1);

          return { options: ctx.options };
        }),
      },
      'OPTIONS.CHANGE': {
        actions: assign((ctx, event) => {
          ctx.options[event.id] = event.value;

          return { options: ctx.options };
        }),
      },
    },

    states: {
      'not ready': {
        always: [{ target: 'ready', cond: 'canSpin' }],
      },

      ready: {
        always: [{ target: 'not ready', cond: 'cannotSpin' }],
        on: {
          SPIN: {
            target: 'reset',
          },
        },
      },

      reset: {
        after: { 150: 'spinning' },
      },

      spinning: {
        after: { STOPPING_DELAY: 'not ready' },
        // on: {
        //   STOP: 'stopped',
        // },
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
      // asdfSF: assign(),
      // log: (ctx, event) => {
      //   console.log('⚙️ State ctx :', ctx);
      //   console.log(event.type);
      // },
    },
  }
);

export const wheelMachineContext = createActorContext(wheelMachine);

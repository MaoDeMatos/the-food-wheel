'use client';

import { createActorContext } from '@xstate/react';
import { assign, createMachine } from 'xstate';

export type WheelImageMachineContext = {
  image: string | null;
};

export type WheelImageMachineEvents = {
  type: 'IMAGE.SET';
  value: WheelImageMachineContext['image'];
};
// | { type: 'IMAGE.REMOVE' };

const wheelImageMachine = createMachine({
  tsTypes: {} as import('./wheelImageMachine.typegen').Typegen0,
  // Will be `true` by default in version 5.0
  predictableActionArguments: true,
  id: 'Wheel Image Machine',
  initial: 'default',

  states: { default: {} },

  schema: {
    context: {} as WheelImageMachineContext,
    events: {} as WheelImageMachineEvents,
  },

  context: {
    image: null,
  },

  on: {
    'IMAGE.SET': {
      actions: [
        assign((_, event) => ({
          image: event.value,
        })),
      ],
    },
    // 'IMAGE.REMOVE': { actions: [assign(() => ({ image: null }))] },
  },
});

export const wheelImageMachineContext = createActorContext(wheelImageMachine);

export const useWheelImageMachine = () => wheelImageMachineContext.useActor();

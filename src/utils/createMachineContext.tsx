import { useMachine } from '@xstate/react';
import { ComponentPropsWithoutRef, createContext, useContext } from 'react';
import { Actor, AnyStateMachine, StateFrom } from 'xstate';

export function createMachineContext<TMachine extends AnyStateMachine>(
  machine: TMachine
) {
  const context = createContext<
    [StateFrom<TMachine>, Actor<TMachine>['send'], Actor<TMachine>] | null
  >(null);
  context.displayName = machine.id + 'ContextProvider';

  function Provider(
    props: Omit<ComponentPropsWithoutRef<typeof context.Provider>, 'value'>
  ) {
    const ctxMachine = useMachine(machine);
    return <context.Provider value={ctxMachine} {...props} />;
  }

  function useMachineContext() {
    const ctx = useContext(context);
    if (!ctx) {
      throw new Error(
        `${context.displayName} must be used within its provider`
      );
    }
    return ctx;
  }

  return {
    ...context,
    Provider,
    useMachineContext,
  };
}

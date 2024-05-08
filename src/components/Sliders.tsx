import { ChangeEvent, useCallback, useMemo } from 'react';

import { slugify } from '@/utils';
import { useWheelMachineContext } from '@/utils/wheelMachine';

type CustomSliderComponentProps = {
  label: string;
  isLabelVisible?: boolean;
  value: number;
  isValueVisible?: boolean;
  handleValueChanges: (newVal: number) => void;
  min?: number;
  /** Make sure your `max` value is not too high with carets enabled,
   * or update the component to avoid breaking the carets */
  max: number;
  step?: number;
  withCarets?: boolean;
};

export function CustomSliderComponent({
  label,
  isLabelVisible = true,
  value,
  isValueVisible = true,
  handleValueChanges,
  min = 0,
  max,
  step = 1,
  withCarets = false,
}: CustomSliderComponentProps) {
  const [machine] = useWheelMachineContext();

  const valueChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleValueChanges(e.target.valueAsNumber);
    },
    [handleValueChanges]
  );

  const carets = useMemo(() => {
    if (!withCarets) return null;
    const arr: number[] = [];

    for (let i = min; i <= max; i++) {
      arr.push(i);
    }

    // If an element has more than one digit,
    // hide numbers to ensure carets are aligned
    return arr.find((el) => el > 9)
      ? arr.map((el) => (
          <div key={el} className="flex flex-col items-center">
            <span>|</span>
          </div>
        ))
      : arr.map((el) => (
          <div key={el} className="flex flex-col items-center">
            <span>|</span>
            <span>{el}</span>
          </div>
        ));
  }, [withCarets, min, max]);

  const labelId = slugify(label);

  const disabled = machine.matches('reset') || machine.matches('spinning');

  return (
    <div>
      <div className="flex items-start justify-between pb-2">
        <label htmlFor={labelId} className={!isLabelVisible ? 'sr-only' : ''}>
          {label}
        </label>
      </div>

      <div className="flex w-full items-center gap-2">
        <div className="flex w-full flex-col items-center gap-1">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            className="range range-primary range-xs disabled:cursor-not-allowed disabled:opacity-60"
            onChange={valueChangeHandler}
            step={step}
            disabled={disabled}
            id={labelId}
          />

          {withCarets && (
            <div className="flex w-full justify-between px-1 text-xs">
              {carets}
            </div>
          )}
        </div>

        {isValueVisible && <span className="block font-bold">{value}</span>}
      </div>
    </div>
  );
}

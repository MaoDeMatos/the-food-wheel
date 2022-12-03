'use client';

import { ChangeEvent, useMemo, useState } from 'react';

export function LeftMenu() {
  const [rangeValue, setRangeValue] = useState(2);
  const [rangeValue2, setRangeValue2] = useState(8);

  return (
    <div className="card card-compact w-full bg-base-300 sm:w-56">
      <div className="card-body">
        <p>Configuration</p>

        <CustomSliderComponent
          label="Initial speed :"
          value={rangeValue}
          handleValueChanges={(newVal: number) => {
            setRangeValue(newVal);
          }}
          min={1}
          max={9}
          withCarets
        />

        <CustomSliderComponent
          label="Slowdown speed :"
          value={rangeValue2}
          handleValueChanges={(newVal: number) => {
            setRangeValue2(newVal);
          }}
          min={1}
          max={20}
        />

        <p>Options</p>
        <p>McDonalds</p>
        <p>Add a new choice</p>
      </div>
    </div>
  );
}

type CustomSliderComponentProps = {
  label?: string;
  value: number;
  handleValueChanges: (newVal: number) => void;
  min?: number;
  /** Make sure yourwith carets enabled,
   * or update the component to avoid breaking it */
  max: number;
  step?: number;
  withCarets?: boolean;
};

function CustomSliderComponent({
  label,
  value,
  handleValueChanges,
  min = 0,
  max,
  step = 1,
  withCarets = false,
}: CustomSliderComponentProps) {
  function valueChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    // handleValueChanges(Math.max(min, Math.min(max, Number(e.target.value))));
    handleValueChanges(Number(e.target.value));
  }

  const carets = useMemo(() => {
    const arr: number[] = [];

    for (let i = min; i <= max; i++) {
      arr.push(i);
    }

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
  }, [min, max]);

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <p>{label}</p>
        <input
          type="number"
          className="input-ghost input input-xs text-right font-bold text-secondary"
          value={value}
          onChange={valueChangeHandler}
          min={min}
          max={max}
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="range range-secondary range-xs"
        onChange={valueChangeHandler}
        step={step}
      />
      <div className="flex w-full justify-between px-1 text-xs">
        {withCarets ? carets : null}
      </div>
    </div>
  );
}

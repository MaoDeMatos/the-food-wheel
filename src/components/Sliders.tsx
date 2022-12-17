'use client';

import { ChangeEvent, useMemo } from 'react';
import { useDataStoreAsync } from '../DataStore';

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

export function CustomSliderComponent({
  label,
  value,
  handleValueChanges,
  min = 0,
  max,
  step = 1,
  withCarets = false,
}: CustomSliderComponentProps) {
  const { wheelStatus } = useDataStoreAsync();

  function valueChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    handleValueChanges(Number(e.target.value));
  }

  const carets = useMemo(() => {
    if (!withCarets) return null;
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
  }, [withCarets, min, max]);

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <p>{label}</p>
        <input
          type="number"
          dir="rtl"
          className="input-ghost input input-xs text-sm font-bold text-primary"
          value={value}
          onChange={valueChangeHandler}
          min={min}
          max={max}
          disabled={wheelStatus === 'spinning'}
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="range range-primary range-xs disabled:opacity-60"
        onChange={valueChangeHandler}
        step={step}
        disabled={wheelStatus === 'spinning'}
      />
      <div className="flex w-full justify-between px-1 text-xs">{carets}</div>
    </div>
  );
}

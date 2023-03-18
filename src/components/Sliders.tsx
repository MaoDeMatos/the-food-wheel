import { ChangeEvent, useMemo } from 'react';
import { useDataStoreAsync } from '../DataStore';
import { slugify } from '../utils';

type CustomSliderComponentProps = {
  label: string;
  isLabelVisible?: boolean;
  value: number;
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

  const labelId = slugify(label);
  const labelIdSlider = slugify(label + ' slider');

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <label htmlFor={labelId} className={!isLabelVisible ? 'sr-only' : ''}>
          {label}
        </label>

        <span className="font-bold">{value}</span>
      </div>

      <label htmlFor={labelIdSlider} className="sr-only">
        {label}
      </label>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="range range-primary range-xs disabled:opacity-60"
        onChange={valueChangeHandler}
        step={step}
        disabled={wheelStatus === 'spinning'}
        id={labelIdSlider}
      />
      <div className="flex w-full justify-between px-1 text-xs">{carets}</div>
    </div>
  );
}

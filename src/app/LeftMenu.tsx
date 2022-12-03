'use client';

import { useState } from 'react';
import { CustomSliderComponent } from '../components/Sliders';

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

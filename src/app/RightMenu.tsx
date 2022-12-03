'use client';

import { useSnapshot } from 'valtio';
import { dataStore } from '../DataStore';

export function RightMenu() {
  const { options } = useSnapshot(dataStore);

  return (
    <div className="card card-compact w-full bg-base-300 sm:w-56">
      <div className="card-body">
        <p>Caption</p>

        {options.length ? (
          options.map((el) => <p key={el}>{el}</p>)
        ) : (
          <p>Enter at least two options in the other panel to start.</p>
        )}
      </div>
    </div>
  );
}

'use client';

import { useMemo } from 'react';
import { useDataStoreAsync } from '../DataStore';

export function RightMenu() {
  const { options } = useDataStoreAsync();

  const filteredOptions = useMemo(() => options.filter(Boolean), [options]);

  return (
    <div className="card card-compact w-full bg-base-300 sm:w-56">
      <div className="card-body">
        <p className="text-lg font-bold">Caption</p>

        {filteredOptions.length < 2 && (
          <p className="italic">
            Enter at least two options in the other panel to start.
          </p>
        )}

        {filteredOptions.length
          ? filteredOptions.filter(Boolean).map((opt, idx) => (
              <p key={idx} className="truncate">
                {`${idx + 1}. ${opt}`}
              </p>
            ))
          : null}
      </div>
    </div>
  );
}

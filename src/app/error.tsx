'use client';

import ErrorPage, { $defaultActionClasses } from '@/components/ErrorPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPage
      topRow={error.name}
      bottomRow={error.message}
      middleRowActionJSX={
        <button type="button" className={$defaultActionClasses} onClick={() => reset()}>
          Retry
        </button>
      }
    />
  );
}

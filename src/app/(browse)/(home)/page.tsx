import { Suspense } from 'react';
import { Results, ResultsSkeleton } from './_components/results';

export default function Home() {
  return (
    <div>
      <div className="mx-auto h-full p-8">
        <Suspense fallback={<ResultsSkeleton />}>
          <Results />
        </Suspense>
      </div>
    </div>
  );
}

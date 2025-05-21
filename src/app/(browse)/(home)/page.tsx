import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/results";

export default function Home() {
  return (
    <div>
      <div className="h-full p-8 mx-auto">
        <Suspense fallback={<ResultsSkeleton/>}>
          <Results/>
        </Suspense>
      </div>
    </div>
  )
}

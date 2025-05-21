import { getStreams } from "@/lib/feed-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

export const Results = async () => {
  const data = await getStreams();

  return (
    <div className="text-lg font-semibold mb-4">
      <h2 className="pb-4">Suggested Streams.</h2>
      {(data.length > 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {data.map((result) => (
            <ResultCard key={result.username} data={result} />
          ))}
        </div>
      ) : (
        <div>
          Empty
        </div>
      )}
    </div>
  )
}

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid gird-cols-1 md:grid-cols-2 lg: grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(6)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
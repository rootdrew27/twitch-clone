import { getSearchResults } from "@/lib/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  term?: string;
}

export const Results = async ({
  term
}: ResultsProps) => {

  const searchResults = await getSearchResults(term);

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold mb-4">
        Results
      </h2>
      <div className="flex flex-row gap-x-2 gap-y-4">
        {searchResults.length === 0 ? (
          <p className="text-muted-foreground text-sm">No results found. Try another search.</p>
        ) : (
          <div className="flex flex-col gap-y-4">
            {searchResults.map((result) => (
              <ResultCard key={result.user_id} result={result} />
            ))}
          </div>
        )}


      </div>
    </div>
  )
}

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4"/>
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i}/>
        ))}
      </div>
    </div>
  )
}
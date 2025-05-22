import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Results, ResultsSkeleton } from './_components/results';

interface SearchPageProps {
  searchParams: Promise<{
    term?: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const term = (await searchParams).term;

  if (!term) {
    redirect('/');
  }

  return (
    <div className="max-w-screen mx-auto h-full p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={term} />
      </Suspense>
    </div>
  );
};

export default SearchPage;

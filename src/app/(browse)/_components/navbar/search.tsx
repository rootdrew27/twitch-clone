'use client';

import qs from 'query-string';
import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // page will not refresh by default

    if (!value) {
      return;
    }

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    // url = "domain:port?term=value"

    router.push(url);
  };

  const onClear = () => {
    setValue('');
  };

  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="relative flex w-full items-center lg:w-[400px]"
    >
      <Input
        value={value}
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
        className="h-8 rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X
          className="right-13 text-muted-foreground absolute top-1.5 h-5 w-5 cursor-pointer transition hover:opacity-75"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="outline"
        className="rounded-l-none"
      >
        <SearchIcon className="text-muted-foreground h-5 w-5" />
      </Button>
    </form>
  );
};

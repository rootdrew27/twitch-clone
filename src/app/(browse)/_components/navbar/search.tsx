"use client";

import qs from "query-string";
import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // page will not refresh by default

    if (!value) {
      return;
    }

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    // url = "domain:port?term=value"

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 h-8"
      />
      {value && (
        <X className="absolute top-1.5 right-13 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition" onClick={onClear}/>
      )}
      <Button
        type="submit"
        size="sm"
        variant="outline"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

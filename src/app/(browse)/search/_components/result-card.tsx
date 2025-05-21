import { SearchResult } from "@/models/definitions"
import Link from "next/link";
import { FC } from "react"
import { Thumbnail, ThumbnailSkeleton } from "../../(home)/_components/thumbnail";
import { VerifiedMark } from "@/components/verified-mark";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
  result: SearchResult
}

export const ResultCard: FC<ResultCardProps> = (props) => {

  const searchResult = props.result;

  return (
    <Link href={`/${searchResult.username}`}> 
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={""} 
            fallback={searchResult.image_url}
            username={searchResult.username}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
              {searchResult.name}
            </p>
            <VerifiedMark /> 
          </div>
          <p className="text-sm text-muted-foreground">{searchResult.name}</p>
          <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(searchResult.updated_at), {addSuffix: true})}</p>
        </div>
      </div>
    </Link>

  )
} 

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}
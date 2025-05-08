import { StreamPlayerSkeleton } from "@/components/stream/player"
import { HeaderSkeleton } from "@/components/stream/player/header";

const CreatorLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
      <HeaderSkeleton />
    </div>
  )
}

export default CreatorLoading;
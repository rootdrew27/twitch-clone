import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-4 gap-y-4">
      <UserButton />
    </div>
    
  )
}

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/lighting-mode-dropdown-menu";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <ModeToggle /> 
      </div>
      <div className="flex flex-4 gap-y-4">
        <UserButton />
      </div>
    </div>
  )
}

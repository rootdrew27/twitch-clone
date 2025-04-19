import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-x-4 hover:opacity-75 transition">
            <Link href="/" className="hover:fade transition">
                    <div className="bg-white rounded-full p-1 shrink-0 md:mr-0 md:shrink">
                        <Image src="/sample.svg" alt="twitch-clone" height="24" width="24"/>
                    </div> 
                    {/* <h2 className="font-bold text-lg">DISCO</h2> */}
            </Link>
            <div>
                <p className="text-sm pt-1 font-light text-muted-foreground">Creator Dashboard</p>
            </div>
        </div>

    )
}


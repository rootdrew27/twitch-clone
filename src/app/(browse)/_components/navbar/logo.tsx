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
        <div>
            <Link href="/" className="hover:fade transition">
                <div className="flex items-center gap-x-4 hover:opacity-75 transition">
                    {/* <div className="bg-white rounded-full p-1 shrink-0 lg:mr-0 lg:shrink">
                        <Image src="./sample.svg" alt="twitch-clone" height="32" width="32"/>
                    </div>  */}
                    <h2 className="font-bold text-lg">DISCO</h2>
                </div>
            </Link>
            <div>
                <p className="text-sm font-light">Demo</p>
            </div>
        </div>

    )
}


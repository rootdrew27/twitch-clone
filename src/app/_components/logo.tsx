import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-white rounded-full p-1">
                    <Image src="/sample.svg" alt="twitch-clone" height="32" width="32"/>
                </div> 
            </div>
        </Link>
    )
}


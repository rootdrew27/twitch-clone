import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-x-4 transition hover:opacity-75">
      <Link href="/" className="hover:fade transition">
        <div className="shrink-0 rounded-full bg-white p-1 md:mr-0 md:shrink">
          <Image src="/sample.svg" alt="twitch-clone" height="24" width="24" />
        </div>
        {/* <h2 className="font-bold text-lg">DISCO</h2> */}
      </Link>
      <div>
        <p className="text-muted-foreground pt-1 text-sm font-light">Demo</p>
      </div>
    </div>
  );
};

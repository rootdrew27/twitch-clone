import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-4 transition hover:opacity-75 lg:flex">
        <div className="rounded-full bg-white p-1">
          <Image src="/sample.svg" alt="twitch-clone" height="32" width="32" />
        </div>
      </div>
    </Link>
  );
};

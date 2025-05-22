import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t find the user you were looking for.</p>
      <Button variant="outline" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;

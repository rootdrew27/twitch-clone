'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="text-muted-foreground flex h-full flex-col items-center justify-center space-y-4">
      <p>Something went wrong!</p>
      <Button variant="outline" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;

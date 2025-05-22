import { Loader } from 'lucide-react';

interface LoadingVideoProps {
  label: string;
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Loader className="text-muted-foreground h-10 w-10 animate-spin" />
      <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};

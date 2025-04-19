import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Clapperboard } from "lucide-react";

const Dashboard = ({ username }: { username: string}) => {
    return (
    <Button
        size="sm"
        variant="outline"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href={`/u/${username}`}>
          <Clapperboard className="h-5 w-5 lg:mr-2"/>
          <span className="hidden lg:block">Dashboard</span>
        </Link>
      </Button>
    )
}

export default Dashboard;
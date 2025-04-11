import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar/";

const BrowseLayout = ({
    children,
}: { children: React.ReactNode}) => {
    return (
        <div className="flex">
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default BrowseLayout;
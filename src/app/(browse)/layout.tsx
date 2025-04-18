import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar/";
import { Container } from "./_components/container";

const BrowseLayout = ({
    children,
}: { children: React.ReactNode}) => {
    return (
        <div className="flex">
            <Navbar />
            <div className="flex h-full pt-20 w-full">
                <Sidebar />                
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    )
}

export default BrowseLayout;
const AuthLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex flex-4 gap-y-4">
            {children}
        </div>
    )
}

export default AuthLayout;
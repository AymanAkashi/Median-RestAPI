import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <div className="bg-white dark:bg-background_dark min-h-[calc(100vh-3.5rem)] w-full">
            {children}
        </div>
    )
}

export default layout

import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <div className=" min-h-[calc(100vh-3.5rem)] w-full flex  justify-center items-center bg-article bg-cover bg-fixed">
            {children}
        </div>
    )
}

export default layout

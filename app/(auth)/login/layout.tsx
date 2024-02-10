import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const mystyle = {
        minHeight: 'calc(100vh - 200px)',
    }

    return (
        <main className="flex justify-center items-center mt-4" style={mystyle}>
            {children}
        </main>
    )
}

export default layout

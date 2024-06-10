import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <div className="bg-white dark:bg-background_dark min-h-[calc(100vh-3.5rem)] w-full flex flex-col justify-between items-center">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default layout

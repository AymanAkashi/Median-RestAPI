import Footer from '@/components/Footer'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}

export default HomeLayout

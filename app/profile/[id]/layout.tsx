import React from 'react'
import Footer from '@/components/Footer'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full sm:min-h-[calc(100vh-3.5rem)] min-h-[calc(100vh-2.5rem)] flex flex-col justify-between items-center">
            {children}
            <Footer />
        </div>
    )
}

export default layout

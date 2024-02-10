import Navbar from '@/components/Navbar'
import React from 'react'
import Image from 'next/image'

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
            <Image
                src={'/assets/rightLine.svg'}
                alt="right line"
                width={100}
                height={100}
                className="absolute top-[40%] right-0 w-48 -z-10"
            />
            <Image
                src={'/assets/leftLine.svg'}
                alt="left line"
                width={100}
                height={100}
                className="absolute bottom-[40%] left-0 w-48 -z-10"
            />
        </main>
    )
}

export default layout

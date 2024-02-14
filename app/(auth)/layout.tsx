import React from 'react'
import Image from 'next/image'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}): JSX.Element {
    return (
        <div className="w-full min-h-[calc(100vh-2.5rem)] sm:min-h-[calc(100vh-3.5rem)] bg-default flex justify-center items-center relative">
            {children}
            <Image
                src={'/assets/rightLine.svg'}
                alt="right line"
                width={100}
                height={100}
                className="absolute top-[40%] right-0 w-48 z-10"
            />
            <Image
                src={'/assets/leftLine.svg'}
                alt="left line"
                width={100}
                height={100}
                className="absolute bottom-[40%] left-0 w-48 z-10"
            />
        </div>
    )
}

import React from 'react'
import Image from 'next/image'

const Home = () => {
    return (
        <div className="w-full h-full">
            <Image
                alt="book"
                src="/assets/background.svg"
                layout="fill"
                quality={100}
                className="flex justify-center items-center"
            />
            <div></div>
        </div>
    )
}

export default Home

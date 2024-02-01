import React from 'react'
import Image from 'next/image'
import Button from './Button'

const Home = () => {
    return (
        <div className="w-full h-full flex-col justify-center items-center mt-10 relative gap-y-6">
            <div className="flex justify-center items-center">
                <h1 className="text-2xl sm:text-5xl text-white font-bold animate-charcter">
                    Welcome to Median
                </h1>
            </div>
            <div className="flex justify-center items-center">
                <h1 className="text-md sm:text-xl text-white font-thin text-center w-[600px] py-10 px-6 z-10">
                    At Median Posting, we believe that everyone has a story to
                    tell and knowledge to share. Our platform is designed to
                    empower individuals from all walks of life to express
                    themselves, connect with others, and contribute to a diverse
                    range of topics.
                </h1>
                <Image
                    src="/assets/image-bg.svg"
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    className="absolute flex justify-center items-center w-4/5 md:w-3/5 xl:w-1/2 rounded-full opacity-35 -z-10"
                />
            </div>
            <div className="flex justify-center items-center">
                <Button
                    props={{
                        href: '/signin',
                        title: 'Join',
                        text: 'Join us',
                    }}
                />
            </div>
        </div>
    )
}

export default Home

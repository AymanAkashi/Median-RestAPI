import Lottie from 'lottie-react'
import animationData from '@/public/lottiefiles/userNotFound.json'
import React from 'react'

const UserNotFound = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center relative">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold absolute inset-x-0 flex justify-center items-center z-10 dark:bg-background_dark bg-white">
                User Not Found
            </h1>
            <Lottie
                animationData={animationData}
                width={80}
                height={80}
                className="flex justify-center items-center w-96 h-96 z-0"
                loop={false}
            />
        </div>
    )
}

export default UserNotFound

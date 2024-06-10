'use client'
import React from 'react'
import Lottie from 'lottie-react'
import animationData from '@/public/lottiefiles/LoadingBook.json'

const Loading = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <Lottie
                animationData={animationData}
                className="flex justify-center items-center"
                loop={true}
            />
        </div>
    )
}

export default Loading

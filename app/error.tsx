'use client'
import React from 'react'
import Lottie from 'lottie-react'
import animationData from '@/public/lottiefiles/notFound.json'

const errorPage = () => {
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

export default errorPage

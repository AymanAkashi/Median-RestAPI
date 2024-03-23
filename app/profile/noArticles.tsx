'use client'
import React from 'react'
import Lottie from 'lottie-react'
import { useEffect, useRef } from 'react'
import animationData from '@/public/lottiefiles/noArticle.json'

const NoArticle = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center relative">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary dark:text-primary_dark absolute inset-x-0 flex justify-center items-center z-10 dark:bg-background_dark bg-white">
                No Articles Found
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

export default NoArticle

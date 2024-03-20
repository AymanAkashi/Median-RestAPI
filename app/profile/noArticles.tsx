'use client'
import React from 'react'
import Lottie from 'lottie-react'
import { useEffect, useRef } from 'react'
import animationData from '@/public/lottiefiles/noArticle.json'

const NoArticle = () => {
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

export default NoArticle
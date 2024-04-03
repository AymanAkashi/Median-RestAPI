'use client'
import React from 'react'
import Slides from './Slides'

const NotifPage = () => {
    const [switchSlides, setSwitchSlides] = React.useState(0)

    const handleSlide = (direction: string) => {
        if (direction === 'left') {
            setSwitchSlides((prev) => {
                return prev - 1 < 0 ? 2 : prev - 1
            })
        } else {
            setSwitchSlides((prev) => {
                return prev + 1 > 2 ? 0 : prev + 1
            })
        }
        setSwitchSlides((prev) => {
            console.log(prev)
            return prev
        })
    }
    const slides = [
        {
            title: 'Slide 1',
            description: 'This is the first slide',
            body: 'This is the body of the first slide',
            image: 'https://source.unsplash.com/random/1280x720?sig=1',
        },
        {
            title: 'Slide 2',
            description: 'This is the second slide',
            body: 'This is the body of the second slide',
            image: 'https://source.unsplash.com/random/1280x720?sig=1',
        },
        {
            title: 'Slide 3',
            description: 'This is the third slide',
            body: 'This is the body of the third slide',
            image: 'https://source.unsplash.com/random/1280x720?sig=1',
        },
    ]

    return (
        <div className="w-4/5 h-96 rounded-2xl bg-zinc-100 m-auto mt-6 flex justify-center relative">
            <Slides Article={slides[switchSlides]} />
            <button
                type="button"
                title="switch Slide"
                onClick={() => handleSlide('left')}
                className="absolute left-1 top-[50%] transform font-bold text-2xl z-10 hover:text-primary_dark hover:scale-125 transition-all duration-150 delay-100"
            >
                {'<'}
            </button>
            <button
                type="button"
                title="switch Slide"
                onClick={() => handleSlide('right')}
                className="absolute right-1 top-[50%] transform font-bold text-2xl z-10 hover:text-primary_dark hover:scale-125 transition-all duration-150 delay-100"
            >
                {'>'}
            </button>
        </div>
    )
}

export default NotifPage

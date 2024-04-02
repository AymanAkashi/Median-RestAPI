'use client'
import React from 'react'

const NotifPage = () => {
    const [switchSlides, setSwitchSlides] = React.useState([1, 2, 3])

    const handleSlide = (direction: string) => {
        if (direction === 'left') {
            setSwitchSlides((prev) => {
                return prev.map((slide) => {
                    return slide - 1 < 1 ? 3 : slide - 1
                })
            })
        } else {
            setSwitchSlides((prev) => {
                return prev.map((slide) => {
                    return slide + 1 > 3 ? 1 : slide + 1
                })
            })
        }
    }
    const slides = [
        {
            title: 'Slide 1',
            desription: 'This is the first slide',
            body: 'This is the body of the first slide',
            image: 'https://via.placeholder.com/150',
        },
        {
            title: 'Slide 2',
            desription: 'This is the second slide',
            body: 'This is the body of the second slide',
            image: 'https://via.placeholder.com/150',
        },
        {
            title: 'Slide 3',
            desription: 'This is the third slide',
            body: 'This is the body of the third slide',
            image: 'https://via.placeholder.com/150',
        },
    ]

    return (
        <div className="w-4/5 h-96 rounded-2xl bg-zinc-100 m-auto mt-6 flex justify-center relative overflow-x-scroll">
            <div className="w-full h-96 bg-slate-500 absolute ">
                <h1 className="text-2xl text-center">Notifications Page</h1>
                <p className="text-center">This is the notification page</p>
            </div>
            <div className="w-full h-96 bg-yellow-500 absolute left-[100%]"></div>
            <div className="w-full h-96 bg-purple-500 absolute left-[200%]"></div>
            <button
                type="button"
                title="switch Slide"
                onClick={() => handleSlide('left')}
            >
                {'<'}
            </button>
            <button
                type="button"
                title="switch Slide"
                onClick={() => handleSlide('right')}
            >
                {'>'}
            </button>
        </div>
    )
}

export default NotifPage

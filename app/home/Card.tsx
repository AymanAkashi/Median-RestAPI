import React, { useEffect } from 'react'
import { Article } from '../types/types'
import Link from 'next/link'

const Card = (article: Article) => {
    const [image, setImage] = React.useState('')
    const getImage = async () => {
        const res = await fetch(
            'https://api.api-ninjas.com/v1/randomimage?category=nature'
        ).then((res) => res.json())
        console.log('res:', res)
        setImage(res.image)
    }

    useEffect(() => {
        getImage()
    }, [])

    console.log('image:', image)

    return (
        <div
            className="flex justify-center items-center  w-[500px]"
            style={{
                minHeight: 'calc(100vh - 64px)',
            }}
        >
            <div className="flex-col justify-center items-center bg-slate-500 backdrop-blur-2xl border-4 border-gray-500/20 rounded-xl text-center">
                <h1 className="text-black font-bold text-xl">
                    {article.title}
                </h1>
                <div className="text-black/90 font-mono text-md text-start">
                    {article.description}
                </div>
                <div className="text-start font-thin text-md text-black/80 relative">
                    {article.body.slice(0, 100)}
                    <Link href={`/articles/${article.id}`}>
                        <p className="text-gray-800 hover:text-white text-end bg-green-500 absolute bottom-0 right-0 rounded-lg px-2 hover:bg-yellow-300 transition-all delay-75 duration-200 z-10">
                            Read More
                        </p>
                    </Link>
                    <div className="bg-gradient-to-t from-white/50 to-black-0 drop-blur-lg w-full h-10 relative bottom-0 right-0 z-0 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:pointer-events-none"></div>
                </div>
                <div className="flex justify-end items-center text-sm font-extralight">
                    {article.updatedAt.slice(0, 10)}
                </div>
            </div>
        </div>
    )
}

export default Card

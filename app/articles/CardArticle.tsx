import React from 'react'
import { Article } from '../types/types'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa6'

const CardArticle = (Article: Article) => {
    console.log(Article)
    return (
        <Link
            className="bg-accent/10 shadow-md  p-4 sm:p-10 m-2 sm:m-4 border-b-2 border-accent/15 rounded-2xl w-[90%] h-40 sm:w-96 sm:h-60 transition-all duration-150 hover:shadow-lg hover:border-accent/20 hover:scale-105 flex flex-col justify-between items-start "
            href={`/articles/${Article.id}`}
        >
            <h1 className="text-md sm:text-2xl font-bold ">{Article.title}</h1>
            <p className="text-[12px] text-gray-500 ">{Article.description}</p>
            <div className=" w-full flex justify-between items-center mt-1 text-[10px]">
                <p className="text-[10px] sm:text-sm text-gray-500">
                    {Article.createdAt.slice(0, Article.createdAt.indexOf('T'))}
                </p>
                <div className="text-[10px] sm:text-sm text-gray-500 flex justify-center items-center relative">
                    <FaHeart className="w-4 h-4 sm:w-6 sm:h-6" />
                    <p className="absolute flex-col justify-center items-center text-white">
                        {Article.Likes}
                    </p>
                </div>
                <span className="font-light">{Article.author?.name}</span>
            </div>
        </Link>
    )
}

export default CardArticle

import React from 'react'
import { Article } from '../types/types'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa6'
import Image from 'next/image'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

const CardArticle = (Article: Article) => {
    console.log(Article)
    return (
        <CardContainer className="inter-var ">
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto lg:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                    {Article.title}
                </CardItem>
                <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm mt-2  dark:text-neutral-300  w-4/5"
                >
                    <p className="text-ellipsis overflow w-full h-4 overflow-hidden">
                        {Article.description}
                    </p>
                </CardItem>
                <CardItem
                    translateZ="100"
                    rotateX={5}
                    translateY={5}
                    className="w-full mt-4"
                >
                    <Image
                        src="/wall.jpg"
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-20 sm:mt-8">
                    <CardItem
                        translateZ={5}
                        translateX={-10}
                        className=" w-6 h-6 rounded-xl text-xs flex justify-center items-center font-normal dark:text-white relative"
                    >
                        <FaHeart className="w-4 h-4 sm:w-6 sm:h-6 z-0" />{' '}
                        <p className="absolute code flex-col justify-center items-center  text-white dark:text-background_dark">
                            {Article.likes}{' '}
                        </p>
                    </CardItem>
                    <CardItem translateZ={0}>
                        <span className="font-light text-black">
                            {Article.author?.name || 'Unkown'}
                        </span>
                    </CardItem>
                    <CardItem
                        translateZ={10}
                        translateX={20}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-primary hover:text-black dark:hover:bg-primary_dark dark:hover:text-black transition-all duration-150"
                    >
                        <Link href={`/articles/${Article.id}`}>Read More</Link>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
        // <Link
        //     className="bg-accent/10 shadow-md dark:shadow-[0_5px_10px_#AFAFAF88] dark:hover:border-b-2 dark:hover:border-white  p-4 sm:p-10 m-2 sm:m-4 border-b-2 border-accent/15 hover:border-accent dark:border-gray-100/50 rounded-2xl w-full  h-40 sm:w-96 sm:h-60 transition-all duration-150 hover:shadow-lg hover:border-accent/20 hover:scale-105 flex flex-col justify-between items-start "
        //     href={`/articles/${Article.id}`}
        // >
        //     <h1 className="text-md sm:text-2xl font-bold ">{Article.title}</h1>
        //     <p className="text-[12px] text-gray-500 ">{Article.description}</p>
        //     <div className=" w-full flex justify-between items-center mt-1 text-[10px]">
        //         <p className="text-[10px] sm:text-sm text-gray-500">
        //             {Article.createdAt.slice(0, Article.createdAt.indexOf('T'))}
        //         </p>
        //         <div className="text-[10px] sm:text-sm text-gray-500 flex justify-center items-center relative">
        //             <FaHeart className="w-4 h-4 sm:w-6 sm:h-6" />
        //             <p className="absolute flex-col justify-center items-center text-white">
        //                 {Article.Likes}
        //             </p>
        //         </div>
        //         <span className="font-light">
        //             {Article.author?.name || 'Unkown'}
        //         </span>
        //     </div>
        // </Link>
    )
}

export default CardArticle

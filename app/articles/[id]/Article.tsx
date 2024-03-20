'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Image } from '@nextui-org/react'
import {Avatar} from "@nextui-org/react";

const Article = ({ id }: { id: number }) => {
    const fetchArticle = async (id: number) => {
        const { data } = await axios.get(`/api/articles/${id.toString()}`)
        return data
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ['article', id],
        queryFn: () => fetchArticle(id),
    })

    if (!isLoading) console.log(data)

    return (
        <div className="flex-col flex justify-center items-center max-w-[860px] m-auto drop-shadow-2xl text-black dark:text-white">
            {isLoading ? (
                <div className="mt-5 w-full">
                    <div className=" w-[90%] h-96 rounded-xl"></div>
                    <p className="text-3xl font-bold w-full h-32 text-center m-auto rounded-xl border-secondary flex justify-start items-center"></p>
                    <p className="text-xl text-gray-800 indent-8 bg-white dark:bg-background_dark/50">
                        {'                    '}
                    </p>
                    <div className="flex justify-between items-center w-[90%] text-md bg-black/10 rounded-xl  px-1 skeleton">
                        <p className="skeleton w-12 bg-gray-200/20">
                            {'          '}
                        </p>
                        <div className="skeleton bg-gray-100/10">
                            {'             '}
                        </div>
                    </div>
                    <p className="text-xl font-normal skeleton bg-gray-500/5"></p>
                </div>
            ) : (
                <div className="mt-5 px-10 w-full">
                    <Image
                        src={
                            'https://source.unsplash.com/random/1280x720?sig=1'
                        }
                        alt={data?.title}
                        width={1280}
                        height={720}
                        loading="lazy"
                        className="flex justify-center items-center rounded-xl object-cover shadow-2xl m-auto"
                    />
                    <p className="text-3xl font-bold w-full h-32 text-center m-auto flex justify-start items-center">
                        {data?.title}
                    </p>
                    <p className="text-xl text-gray-800 dark:text-gray-200 indent-8">
                        {data.description}
                    </p>
                    <br className="my-4" />
                    <p className="indent-12 hyphens-auto overflow-hidden mb-6 max-w-4/5">
                        {data.body}
                    </p>
                    <div className="flex justify-between items-center w-[90%] text-md bg-black/10 dark:bg-white/10 rounded-xl  px-1">
                        <Avatar src={data.author?.avatar} size="sm" />
                        <p className="">
                            {data.author ? data.author.name : 'Unkown'}
                        </p>
                        <div className="">
                            {data.createdAt.slice(
                                0,
                                data.createdAt.indexOf('T')
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Article
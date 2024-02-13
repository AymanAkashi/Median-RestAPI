import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Image from 'next/image'

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
        <div className="flex-col flex justify-center items-center w-[90%] m-auto">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="mt-5 ">
                    <img
                        src={'https://source.unsplash.com/random/500x500?sig=1'}
                        alt={data?.title}
                        width={500}
                        height={500}
                        className="flex justify-center items-center rounded-xl object-cover shadow-2xl m-auto"
                    />
                    <p className="text-3xl font-bold w-full h-32 text-center m-auto  border-b-4 rounded-xl border-secondary flex justify-start items-center">
                        {data?.title}
                    </p>
                    <p className="text-xl text-gray-800 indent-8">
                        {data.description}
                    </p>
                    <div className="flex justify-between items-center w-[90%] text-md bg-black/10 rounded-xl  px-1">
                        <p className="">{data.author.name}</p>
                        <div className="">
                            {data.createdAt.slice(
                                0,
                                data.createdAt.indexOf('T')
                            )}
                        </div>
                    </div>
                    <br className="my-4" />
                    <p className="text-xl font-normal">{data.body}</p>
                </div>
            )}
        </div>
    )
}

export default Article

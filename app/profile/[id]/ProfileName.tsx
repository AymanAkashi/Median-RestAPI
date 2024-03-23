'use client'
import Loading from '@/app/loading'
import Stat from '@/components/Stat'
import { Avatar } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { IoFlash } from 'react-icons/io5'
import { RiArticleFill } from 'react-icons/ri'
import ArticlesCardAnimation from '../ArticlesCardAnimation'
import UserNotFound from './userNotFound'

const ProfileName = ({ id }: { id: string }) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['profile', id],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`/api/users/profile/${id}`)
                if (!data) throw new Error('User not found')
                const articles = await axios.get(`/api/articles/${id}/articles`)
                return {
                    user: data,
                    articles: articles.data,
                }
            } catch (error) {
                console.log(error)
                return null
            }
        },
    })
    if (isLoading) return <Loading />
    if (isError) return <UserNotFound />

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
            {!isLoading && (
                <>
                    <div className="w-full h-full p-10 sm:w-1/2 sm:h-96  rounded-xl  relative flex flex-col justify-center items-center">
                        <span className="w-full h-full absolute inset-x-0 left-0 right-0 top-0 rounded-2xl bg-white/10 blur-sm -z-0 flex justify-evenly items-center"></span>
                        <Avatar
                            src={
                                data?.user.avatar ||
                                'https://images.unsplash.com/placeholder-avatars/extra-large.jpg'
                            }
                            className="w-48 h-48 sm:absolute inset-x-0 flex justify-center items-center sm:-top-20 left-0 right-0 m-auto z-0 top-2"
                            isBordered
                        />
                        <div className="flex flex-col justify-center items-center z-10 bg-accent/80 px-2 rounded-xl">
                            <h1 className="text-3xl font-bold">
                                {data?.user.name}
                            </h1>
                            <p className="text-lg">{data?.user.email}</p>
                        </div>
                        <div className="stats hidden sm:stats-horizontal sm:flex justify-center items-center w-auto z-10 bg-transparent divide-x-2 divide-secondary text-secondary dark:text-white border-accent border dark:border-secondary mt-10">
                            <Stat
                                title="Total Articles"
                                value="25"
                                Icon={RiArticleFill}
                                discrption="21% more than last month"
                            />
                            <Stat
                                title="Total Likes"
                                value="25"
                                Icon={FaHeart}
                                discrption="21% more than last month"
                            />
                            <Stat
                                title="Total Views"
                                value="25"
                                Icon={IoFlash}
                                discrption="21% more than last month"
                            />
                        </div>
                        <div className="sm:hidden  w-full grid grid-cols-2 divide-secondary mt-6">
                            <Stat
                                title="Total Articles"
                                value="25"
                                Icon={RiArticleFill}
                                discrption="21% more than last month"
                            />
                            <Stat
                                title="Total Likes"
                                value="25"
                                Icon={FaHeart}
                                discrption="21% more than last month"
                            />
                            <Stat
                                title="Total Views"
                                value="25"
                                Icon={IoFlash}
                                discrption="21% more than last month"
                                className="col-span-2"
                            />
                        </div>
                    </div>
                    <ArticlesCardAnimation id={data?.user.id} />
                </>
            )}
        </div>
    )
}

export default ProfileName

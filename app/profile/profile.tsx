import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Article, SignUp } from '../types/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FaHeart } from 'react-icons/fa6'
import { IoFlash } from 'react-icons/io5'
import { Avatar } from '@nextui-org/react'
import { RiArticleFill } from 'react-icons/ri'

import axios from 'axios'
import { MdEdit } from 'react-icons/md'
import Stat from '@/components/Stat'
import CardArticle from '@/components/CardArticles'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import Articles from '../articles/[id]/page'
import NoArticle from './noArticles'
import Loading from '../loading';

function UpdateAvatar({
    setImage,
    defaultImage,
    register,
    resetField,
    className,
}: {
    setImage: (image: string) => void
    defaultImage: string
    register: any
    resetField: any
    className: string
}) {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [fileSelected, setFileSelected] = React.useState(false)
    const { ref: refCall, ...rest } = register('avatar')

    const { mutate } = useMutation({
        mutationKey: ['avatar'],
        mutationFn: async (avatar: any) => {
            console.log('avatar', avatar)
            const formData = new FormData()
            formData.append('avatar', avatar[0])
            const res = await axios.post('api/users/me/avatar', formData)
            console.log(res)
            return res
        },
        onSuccess: () => {
            console.log('success')
        },
    })

    return (
        <>
            <button
                title="button"
                className={`rounded-3xl w-8 h-8  bg-primary/50  hover:bg-primary  hover:text-background  transition-all ${className}`}
                onClick={() => {
                    inputRef.current?.click()
                }}
                type="button"
            >
                <div className="relative flex justify-center items-center w-full h-full w-1/">
                    <MdEdit className="inline peer w-4/5 h-4/5 rounded-full text-secondary" />
                </div>
            </button>
            <input
                onChange={() => {
                    setFileSelected(inputRef.current?.files?.length === 1)
                    if (!inputRef.current) return
                    console.log(inputRef.current.files)
                    const file = inputRef.current.files?.[0]
                    if (!file) return
                    const fileUrl = URL.createObjectURL(file)
                    mutate(file)
                    console.log('changing image')
                    setImage(fileUrl)
                }}
                type="file"
                className="hidden"
                ref={(input) => {
                    refCall(input)
                    inputRef.current = input
                }}
                accept="image/*"
                id="file" // Add id attribute
            />
            <label htmlFor="file hidden"></label>
        </>
    )
}

type ProfileType = {
    name: string
    email: string
    oldPassword: string
    newPassword: string
    confirmPassword: string
    avatar: File | null
}

type Item = {
    quote: string
    name: string
    title: string
    image: string
    id: number
}

const CardArticles = ({ id }: { id: number }) => {
    console.log('id:', id)
    const [items, setItems] = useState<Item[]>([])
    const { data: articles, isLoading: loadingArticles } = useQuery({
        queryKey: ['articles', 'me'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/articles/${id}/articles`)
            return data
        },
    })
    useEffect(() => {
        if (!loadingArticles) {
            console.log('articles:', articles)
            articles.map((article: Article) => {
                setItems((items) => [
                    ...items,
                    {
                        quote: article.title,
                        name: article.author,
                        title: article.description,
                        image: article.image,
                        id: article.id,
                    },
                ])
            })
        }
    }, [loadingArticles])
    return (
        <div className="h-[40rem] rounded-md flex antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative w-4/5">
            {loadingArticles ? (
                <Loading />
            ) : items.length > 0 ? (
                <InfiniteMovingCards
                    items={items}
                    direction="right"
                    speed="normal"
                    className="w-full h-full"
                />
            ) : (
                <NoArticle />
            )}
        </div>
    )
}

const profile = () => {
    const { data: me, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const { data } = await axios.get('/api/auth/user')
            return data
        },
    })

    const { register, handleSubmit, resetField, getValues } = useForm({
        defaultValues: {
            avatar: me?.avatar
                ? me.avatar
                : 'https://images.unsplash.com/placeholder-avatars/extra-large.jpg',
        },
    })
    const [Image, setImage] = useState<string>(
        me?.avatar ||
            'https://images.unsplash.com/placeholder-avatars/extra-large.jpg'
    )
    useEffect(() => {
        if (!isLoading) {
            setImage(me.avatar)
        }
    }, [isLoading])

    const submiting = async () => {}

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
            {!isLoading && (
                <>
                    <div className="w-full h-full p-10 sm:w-1/2 sm:h-96  rounded-xl  relative flex flex-col justify-center items-center">
                        <span className="w-full h-full absolute inset-x-0 left-0 right-0 top-0 rounded-2xl bg-white/10 blur-sm -z-0 flex justify-evenly items-center"></span>
                        <Avatar
                            src={me.avatar}
                            className="w-48 h-48 sm:absolute inset-x-0 flex justify-center items-center sm:-top-20 left-0 right-0 m-auto z-0 top-2"
                            isBordered
                        />
                        <div className="flex flex-col justify-center items-center z-10 bg-accent/80 px-2 rounded-xl">
                            <h1 className="text-3xl font-bold">{me.name}</h1>
                            <p className="text-lg">{me.email}</p>
                        </div>
                        <div className="stats hidden sm:stats-horizontal sm:flex justify-center items-center  w-auto z-10 bg-transparent divide-x-2 divide-secondary dark:bg-black text-secondary dark:text-white border-accent border dark:border-secondary mt-10">
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
                    <h1 className="text-3xl font-bold">My Articles</h1>
                    <CardArticles id={me.id} />
                </>
            )}
        </div>
    )
}

export default profile

'use client'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const Edit = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['articles', 'me'],
        queryFn: async () => {
            try {
                const { data } = await axios.get('/api/articles/me/profiles')
                return data
            } catch (error) {
                console.error(error)
            }
        },
    })
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error...</div>
    return (
        <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8">
            <Card
                className={`py-4 dark:hover:shadow-white/20 hover:shadow-sm hover:scale-105 hover:-translate-x-1 hover:shadow-black col-span-12 sm:col-span-5 ${
                    isLoading ? 'skeleton' : ''
                }`}
            >
                <CardHeader
                    className={`pb-0 pt-2 px-4 flex-col items-start ${
                        isLoading ? 'skeleton' : ''
                    }`}
                >
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="https://source.unsplash.com/random/1280x720?sig=1"
                        width={270}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default Edit

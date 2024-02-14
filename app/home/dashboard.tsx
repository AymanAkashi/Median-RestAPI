'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { headers } from 'next/headers'
import { Article } from '@/app/types/types'
import Card from '@/app/home/Card'

const Dashboard = () => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const { data } = await axios.get('/api/articles', {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            return data as Article[]
        },
    })
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{error.message}</div>
    console.log(data)
    return (
        <div className="flex justify-center items-center">
            {data &&
                data.map((article: Article) => (
                    <div key={article.id}>
                        <Card {...article} />
                    </div>
                ))}
        </div>
    )
}

export default Dashboard

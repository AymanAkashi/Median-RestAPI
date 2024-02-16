'use client'
import React from 'react'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import CreateArticle from './createArticles'

const page = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
            },
        },
    })
    return (
        <div className="w-full h-full flex flex-col justify-center items-center ">
            <QueryClientProvider client={queryClient}>
                <h1 className="text-5xl  font-bold mb-4 text-black  dark:text-primary_dark bg-default dark:bg-dark rounded-full px-1">
                    Create new article
                </h1>
                <CreateArticle />
            </QueryClientProvider>
        </div>
    )
}

export default page

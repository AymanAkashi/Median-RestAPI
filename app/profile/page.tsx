'use client'
import React, { Profiler } from 'react'
import { useForm } from '@tanstack/react-form'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import Profile from './profile'
import { defaultConfig } from 'next/dist/server/config-shared'

const page = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
            },
        },
    })
    return (
        <div className="min-h-[calc(100vh-4rem)] w-full">
            <QueryClientProvider client={queryClient}>
                <Profile />
            </QueryClientProvider>
        </div>
    )
}

export default page

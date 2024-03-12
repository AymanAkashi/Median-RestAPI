'use client'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Articles from './articles'
import { NextUIProvider } from '@nextui-org/react'

const page = () => {
    const queryClient = new QueryClient()

    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                <Articles />
            </QueryClientProvider>
        </NextUIProvider>
    )
}

export default page

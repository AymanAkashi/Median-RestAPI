'use client'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Articles from './articles'

const page = () => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Articles />
        </QueryClientProvider>
    )
}

export default page

'use client'
import React from 'react'
import Navbar from '@/components/Navbar'
import Dashborad from './dashboard'
import {
    QueryClient,
    QueryClientProvider,
    useQueryClient,
} from '@tanstack/react-query'

const page = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <Dashborad />
        </QueryClientProvider>
    )
}

export default page

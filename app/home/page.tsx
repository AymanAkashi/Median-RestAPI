'use client'
import React from 'react'
import Dashborad from './dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotifPage from './NotifPage'

const page = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
            },
        },
    })
    return (
        <QueryClientProvider client={queryClient}>
            <NotifPage />
            <Dashborad />
        </QueryClientProvider>
    )
}

export default page

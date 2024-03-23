'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ProfileName from './ProfileName'

const page = ({ params }: { params: { id: string } }) => {
    const id = params.id
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ProfileName id={id} />
        </QueryClientProvider>
    )
}

export default page

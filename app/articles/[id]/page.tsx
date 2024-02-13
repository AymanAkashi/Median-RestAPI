'use client'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Article from './Article'

export default function Articles({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient()

    console.log('id : ', params.id)
    return (
        <QueryClientProvider client={queryClient}>
            <Article id={+params.id} />
        </QueryClientProvider>
    )
}

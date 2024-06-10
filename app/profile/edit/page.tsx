'use client'
import {
    QueryClient,
    QueryClientProvider,
    useQueryClient,
} from '@tanstack/react-query'
import React from 'react'
import Edit from './edit'

interface EditProps {
    id: number
    title: string
    description: string
    tags: string[]
    body: string
    published: boolean
    image: string
}

const EditPage = () => {
    const queryClient = new QueryClient()
    return (
        <div className="flex justify-center items-center h-full w-full">
            <QueryClientProvider client={queryClient}>
                <Edit />
            </QueryClientProvider>
        </div>
    )
}

export default EditPage

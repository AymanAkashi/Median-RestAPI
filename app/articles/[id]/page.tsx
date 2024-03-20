'use client'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Article from './Article'
import { NextUIProvider } from '@nextui-org/react'
import { Image } from '@nextui-org/react'
import { FaGithub } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { SiCodeforces } from 'react-icons/si'

export default function Articles({ params }: { params: { id: string } }) {
    const queryClient = new QueryClient()

    console.log('id : ', params.id)
    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                <Article id={+params.id} />
            </QueryClientProvider>
        </NextUIProvider>
    )
}

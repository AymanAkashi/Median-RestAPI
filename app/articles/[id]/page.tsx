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
                <footer className="footer p-10 dark:bg-dark/50 bg-default/50 mt-6 ">
                    <aside>
                        <Image
                            src="/assets/fullLogo.svg"
                            width={100}
                            height={100}
                        ></Image>
                        <p>Providing reliable tech since 2024</p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Social</h6>
                        <div className="grid grid-flow-col gap-4">
                            <a>
                                <FaGithub />
                            </a>
                            <a>
                                <FaLinkedin />
                            </a>
                            <a>
                                <SiCodeforces />
                            </a>
                        </div>
                    </nav>
                </footer>
            </QueryClientProvider>
        </NextUIProvider>
    )
}

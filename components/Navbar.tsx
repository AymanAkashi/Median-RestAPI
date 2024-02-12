'use client'
import Image from 'next/image'
import Link from 'next/link'
import SearchButton from './SearchButton'
import { RiLogoutCircleRFill, RiLoginCircleFill } from 'react-icons/ri'
import { CgDarkMode } from 'react-icons/cg'
import { GoHomeFill } from 'react-icons/go'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { use, useEffect, useState } from 'react'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios'

export default function Navbar() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: true,
            },
        },
    })
    return (
        <QueryClientProvider client={queryClient}>
            <Nav />
        </QueryClientProvider>
    )
}

export function Nav() {
    const [isLoging, setIsLoging] = useState(false)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['verify'],
        queryFn: async () => {
            const data = await axios
                .get('/api/auth/verify')
                .then((res) => setIsLoging(true))
                .catch((err) => setIsLoging(false))

            console.log(data)
        },
    })

    useEffect(() => {
        if (data) {
            setIsLoging(true)
        }
    }, [data])

    const itemsStyle =
        'mx-2 sm:mx-4 flex justify-center items-center transition-all delay-75 duration-150 hover:text-primary hover:scale-105 text-md font-medium hover:font-bold sm:block hidden'

    return (
        <nav
            id="navbar"
            className="bg-default rounded-b-3xl  w-full h-12 sm:h-14 flex justify-between items-center  font-thin  shadow-lg z-10 text-black relative"
        >
            <Link
                href={'/home'}
                className="p-1 ml-1 w-10 h-10 sm:w-14 sm:h-14 flex justify-center items-center  rounded-full z-20 cursor-pointer"
            >
                <Image
                    src="/assets/logo.svg"
                    alt="WordSmiths"
                    width={100}
                    height={100}
                />
            </Link>
            <div className="flex items-center justify-around space-x-4 px-1">
                <div className="flex justify-center items-center transition-all delay-75 duration-150 hover:text-primary">
                    <SearchButton />
                </div>
                <div className="dropdown dropdown-end dropdown-hover">
                    <div
                        tabIndex={0}
                        className="rounded-full bg-primary text-secondary hover:bg-secondary hover:text-primary text-center h-8 w-8 flex justify-center items-center"
                        role="button"
                        title="menu"
                    >
                        <CgProfile className="h-4/5 w-4/5" />
                    </div>
                    <ul className="dropdown-content z-[1] menu  shadow bg-white w-28 sm:w-32 rounded-2xl">
                        {isLoging ? (
                            <li className="text-secondary flex justify-between items-center w-full rounded-xl">
                                <Link href={'/profile'}>
                                    <CgProfile className="h-4/5 w-4/5 sm:w-6 sm:h-6" />{' '}
                                    Profile
                                </Link>
                            </li>
                        ) : (
                            <li className="text-secondary flex justify-between items-center w-full rounded-xl">
                                <Link
                                    href="/signup"
                                    title="Join now"
                                    className={`text-secondary flex justify-between items-center w-full rounded-xl`}
                                >
                                    <RiLoginCircleFill className="h-4/5 w-4/5 sm:w-6 sm:h-6" />{' '}
                                    Join now
                                </Link>
                            </li>
                        )}
                        <li className="text-secondary flex justify-between items-center w-full rounded-xl">
                            <Link href={'/'}>
                                <GoHomeFill className="h-4/5 w-4/5 sm:w-6 sm:h-6" />
                                Home
                            </Link>
                        </li>
                        <li className="text-secondary flex justify-between items-center w-full rounded-xl">
                            <Link href={'/about'}>
                                <FaRegQuestionCircle className="h-4/5 w-4/5 sm:w-6 sm:h-6" />{' '}
                                About
                            </Link>
                        </li>
                        <li className="text-secondary flex justify-between items-center w-full rounded-xl">
                            <button
                                type="button"
                                title="Dark Mode"
                                onClick={() => {}}
                            >
                                <CgDarkMode className="h-4/5 w-4/5 sm:w-6 sm:h-6" />
                                Theme
                            </button>
                        </li>
                        {isLoging && (
                            <li className="text-secondary flex justify-between items-center w-full rounded-xl">
                                <button
                                    title="logout"
                                    type="button"
                                    onClick={() => {
                                        axios.post('/api/auth/logout')
                                        window.location.href = '/'
                                    }}
                                >
                                    <RiLogoutCircleRFill className="h-4/5 w-4/5 sm:w-6 sm:h-6" />
                                    <p>Logout</p>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

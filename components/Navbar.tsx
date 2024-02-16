'use client'
import Image from 'next/image'
import Link from 'next/link'
import SearchButton from './SearchButton'
import { RiLogoutCircleRFill, RiLoginCircleFill } from 'react-icons/ri'
import { IoMdAdd } from 'react-icons/io'
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
    const [isLoging, setIsLoging] = useState(() => {
        return false
    })

    const [styleNav, setStyleNav] = useState(
        'bg-default dark:bg-dark   w-full h-10 sm:h-14 flex justify-between items-center  font-thin  shadow-lg dark:shadow-[0_3px_10px_#ffffff99] z-10 text-black dark:text-white relative'
    )

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
        const nav = document.getElementById('navbar')

        window.addEventListener('scroll', function () {
            const offset = window.pageYOffset

            if (offset > 40) {
                setStyleNav(
                    '  w-full h-10 bg-secondary/70 sm:h-12 flex justify-between items-center  font-thin  shadow-lg z-10 text-black dark:text-white fixed scroll transition-all delay-75 duration-150'
                )
                console.log('scrolled')
            } else {
                setStyleNav(
                    'bg-default  dark:bg-dark   w-full h-10 sm:h-14 flex justify-between items-center  font-thin  shadow-lg z-10 text-black dark:text-white relative'
                )
                console.log('not scrolled')
            }
        })
        if (data) {
            setIsLoging(true)
        }
    }, [data])

    const itemsStyle =
        'mx-2 sm:mx-4 flex justify-center items-center transition-all delay-75 duration-150 hover:text-primary hover:scale-105 text-md font-medium hover:font-bold sm:block hidden'

    return (
        <nav id="navbar" className={`${styleNav}`}>
            <Link
                href={'/home'}
                className="p-1 h-8 sm:h-4/5 flex justify-center items-center  rounded-full z-20 cursor-pointer text-secondary hover:text-primary dark:text-white dark:hover:text-primary"
            >
                <img
                    src="/assets/logo.svg"
                    alt="WordSmiths"
                    className="w-8 h-8 sm:w-10 sm:h-10"
                />
            </Link>
            <div className="flex items-center justify-center space-x-4  px-1 h-4/5">
                {isLoging && (
                    <Link
                        href={'/profile/create'}
                        title="create article"
                        className=" h-8 w-8  flex justify-center items-center transition-all delay-75 duration-150 bg-primary text-secondary hover:bg-secondary hover:text-primary dark:bg-background_dark dark:text-primary_dark dark:hover:bg-primary_dark dark:hover:text-background_dark rounded-full "
                    >
                        <IoMdAdd className="h-full w-full" />
                    </Link>
                )}
                <div className="flex justify-center items-center transition-all delay-75 duration-150 hover:text-primary ">
                    <SearchButton />
                </div>
                <div className="dropdown dropdown-end dropdown-hover">
                    <div
                        tabIndex={0}
                        className="rounded-full bg-primary dark:hover:bg-primary_dark dark:bg-background_dark text-secondary hover:bg-secondary hover:text-primary dark:text-primary_dark dark:hover:text-background_dark text-center h-8 w-8 flex justify-center items-center"
                        role="button"
                        title="menu"
                    >
                        <CgProfile className="h-4/5 w-4/5" />
                    </div>
                    <ul className="dropdown-content z-[1] menu  shadow bg-white dark:bg-background_dark text-secondary dark:text-white dark:border w-28 sm:w-32 rounded-2xl">
                        {isLoging ? (
                            <li className=" flex justify-between items-center w-full rounded-xl">
                                <Link href={'/profile'}>
                                    <CgProfile className="h-4/5 w-4/5 sm:w-8 sm:h-8" />{' '}
                                    Profile
                                </Link>
                            </li>
                        ) : (
                            <li className=" flex justify-between items-center w-full rounded-xl">
                                <Link
                                    href="/signup"
                                    title="Join now"
                                    className={` flex justify-between items-center w-full rounded-xl`}
                                >
                                    <RiLoginCircleFill className="h-4/5 w-4/5 sm:w-6 sm:h-6" />{' '}
                                    Join now
                                </Link>
                            </li>
                        )}
                        <li className=" flex justify-between items-center w-full rounded-xl">
                            <Link href={'/'}>
                                <GoHomeFill className="h-4/5 w-4/5 sm:w-6 sm:h-6" />
                                Home
                            </Link>
                        </li>
                        <li className=" flex justify-between items-center w-full rounded-xl">
                            <Link href={'/about'}>
                                <FaRegQuestionCircle className="h-4/5 w-4/5 sm:w-6 sm:h-6" />{' '}
                                About
                            </Link>
                        </li>
                        <li className=" flex justify-between items-center w-full rounded-xl">
                            <button
                                type="button"
                                title="Dark Mode"
                                onClick={() => {
                                    localStorage.setItem(
                                        'theme',
                                        document.documentElement.classList.contains(
                                            'dark'
                                        )
                                            ? 'light'
                                            : 'dark'
                                    )
                                    document.documentElement.classList.toggle(
                                        'dark'
                                    )
                                }}
                            >
                                <CgDarkMode className="h-4/5 w-4/5 sm:w-6 sm:h-6" />
                                Dark Mode
                            </button>
                        </li>
                        {isLoging && (
                            <li className=" flex justify-between items-center w-full rounded-xl">
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

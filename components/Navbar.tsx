'use client'
import Image from 'next/image'
import Link from 'next/link'
import SearchButton from './SearchButton'
import { RiLoginCircleFill } from 'react-icons/ri'
import { CgDarkMode } from 'react-icons/cg'
import { GoHomeFill } from 'react-icons/go'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'

export default function Navbar() {
    const [dropDown, setDropDown] = useState(false)
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
                <Link href="#" className={itemsStyle} title="Home">
                    Home
                </Link>
                <Link href="#" className={`${itemsStyle} sm:block hidden`}>
                    About
                </Link>
                <Link
                    href="/signup"
                    title="Join now"
                    className={`mx-2 sm:mx-4  h-6 rounded-full bg-primary font-medium justify-center items-center text-center text-xs  sm:px-2 transition-all delay-75 duration-100 hover:bg-secondary hover:text-primary hover:scale-105 sm:flex hidden`}
                >
                    <p className="sm:block hidden">Join now</p>
                </Link>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        className="sm:hidden rounded-full bg-primary text-secondary hover:bg-secondary hover:text-primary text-center h-8 w-8 flex justify-center items-center"
                        role="button"
                        title="menu"
                    >
                        <IoMenu className="w-6 h-6" />
                    </div>
                    <ul className="dropdown-content z-[1] menu p-2 shadow bg-white w-28 rounded-2xl">
                        <li className="text-secondary flex justify-between items-center w-full hover:bg-primary">
                            <Link href={'/'}>
                                <GoHomeFill />
                                Home
                            </Link>
                        </li>
                        <li className="text-secondary flex justify-between items-center w-full hover:bg-primary">
                            <Link href={'/'}>
                                <FaRegQuestionCircle /> About
                            </Link>
                        </li>
                        <li className="text-secondary flex justify-between items-center w-full hover:bg-primary">
                            <Link href={'/'}>
                                <CgDarkMode />
                                Theme
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

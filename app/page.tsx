'use client'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { Button } from '@nextui-org/react'
import { useEffect, useState, useRef } from 'react'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient'
import { Image } from '@nextui-org/react'
import Loading from './loading'
import { CgDarkMode } from 'react-icons/cg'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from 'next-themes'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Link from 'next/link'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { motion } from 'framer-motion'

const Foo = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [LoadPage, setLoadPage] = useState(true)
    const { setTheme, resolvedTheme } = useTheme()

    const words = [
        {
            text: 'Welcome',
        },
        {
            text: 'to',
        },
        {
            text: 'New',
        },
        {
            text: 'future,',
        },
        {
            text: 'Wordsmiths.',
            className:
                'text-secondary dark:text-primary_dark sm:text-xl text-lg md:text-3xl xl:text-5xl font-bold',
        },
    ]

    useEffect(() => {
        document.getElementById('navbar')?.classList.add('hidden')
        if (resolvedTheme === 'dark') {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }, [resolvedTheme])
    return (
        <>
            <BackgroundGradientAnimation />
            <Parallax
                className="grid content-center min-h-screen w-full relative"
                pages={3}
            >
                <ParallaxLayer
                    offset={0}
                    security="secure"
                    speed={1}
                    factor={1.2}
                    className="text-6xl font-bold flex flex-col justify-center items-center  z-10 h-screen"
                >
                    {LoadPage && (
                        <>
                            <Image
                                src="/assets/fullLogo.svg"
                                width={200}
                                height={200}
                                className="animate-appearance-in"
                            ></Image>
                            <TypewriterEffectSmooth
                                words={words}
                                cursorClassName="bg-secondary dark:bg-primary_dark"
                            />
                            <div className="flex justify-evenly items-center w-72">
                                <Link
                                    href="/signup"
                                    className="dark:text-white text-background_dark hover:bg-primary_dark border-2 border-primary_dark bg-transparent font-light text-lg px-2 py-2 rounded-xl w-24 text-center hover:scale-110 transition-all duration-75 delay-100"
                                >
                                    Join Now
                                </Link>
                                <Link
                                    href="/Login"
                                    className="dark:text-white text-background_dark bg-primary_dark hover:bg-primary font-light text-lg px-2 py-2 rounded-xl w-24 text-center border-2 border-primary_dark hover:scale-110 transition-all duration-75 delay-100"
                                >
                                    Sign In
                                </Link>
                            </div>
                            <Link
                                href={'/home'}
                                className="dark:text-white text-background_dark font-light text-lg px-2 py-2 rounded-xl mt-2 hover:scale-110 text-center underline  hover:font-bold transition-all duration-75 delay-100"
                            >
                                Browser as Guest
                            </Link>
                        </>
                    )}
                </ParallaxLayer>
                <ParallaxLayer
                    offset={1}
                    speed={0.5}
                    className="text-6xl font-bold flex flex-col justify-center text-center  h-screen z-10"
                >
                    Hello this is a testing of Parallax Scrolling
                </ParallaxLayer>
                <ParallaxLayer
                    offset={2}
                    speed={2}
                    className="text-6xl font-bold flex flex-col justify-center text-center  h-screen z-10"
                >
                    Hey Again don't forget to check out the dark mode
                </ParallaxLayer>
            </Parallax>
        </>
    )
}

export default function Page() {
    return <Foo />
}

'use client'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient'
import { Image } from '@nextui-org/react'
import Loading from './loading'
import { CgDarkMode } from 'react-icons/cg'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from 'next-themes'

export default function Page() {
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
            className: 'text-primary dark:text-primary_dark',
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
            <div className="flex justify-center items-center min-h-screen w-full relative">
                <BackgroundGradientAnimation />
                <div className="text-6xl font-bold absolute flex flex-col justify-center items-center z-10 animate-accordion-up">
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
                                cursorClassName="bg-primary dark:bg-primary_dark"
                            />
                            <div className="flex justify-between items-center w-72">
                                <Button
                                    variant="ghost"
                                    color="primary"
                                    size="lg"
                                    className="text-white dark:text-background_dark hover:bg-primary_dark hover:text-white"
                                >
                                    Join Now
                                </Button>
                                <Button
                                    variant="shadow"
                                    color="primary"
                                    size="lg"
                                    className="text-white dark:text-background_dark"
                                >
                                    Signup
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <button
                    className="absolute bottom-1 left-1 p-2 bg-white dark:bg-background_dark rounded-full shadow-md transition-colors duration-1000 delay-75 hover:shadow-lg dark:hover:shadow-lg animate-spin-slow"
                    type="button"
                    title="Dark Mode"
                    onClick={() => {
                        localStorage.setItem(
                            'theme',
                            darkMode ? 'light' : 'dark'
                        )
                        document.documentElement.classList.toggle('dark')
                        setDarkMode((prev) => !prev)
                    }}
                >
                    {darkMode ? (
                        <FiMoon className="h-6 w-6 sm:w-10 sm:h-10" />
                    ) : (
                        <FiSun className="h-6 w-6 sm:w-10 sm:h-10" />
                    )}
                </button>
            </div>
        </>
    )
}

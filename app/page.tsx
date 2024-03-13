'use client'
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient'
import { Image } from '@nextui-org/react'
import Loading from './loading'

export default function Page() {
    const [LoadPage, setLoadPage] = useState(true)
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
            className: 'shadow-lg',
        },
        {
            text: 'Wordsmiths.',
            className: 'text-primary dark:text-primary_dark',
        },
    ]
    return (
        <>
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] w-full relative">
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
            </div>
        </>
    )
}

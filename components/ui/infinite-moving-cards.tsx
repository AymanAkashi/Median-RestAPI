'use client'

import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react'
import { redirect, useRouter } from 'next/navigation'

export const InfiniteMovingCards = ({
    items,
    direction = 'left',
    speed = 'fast',
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string
        name: string
        title: string
        image: string
        id: number
    }[]
    direction?: 'left' | 'right'
    speed?: 'fast' | 'normal' | 'slow'
    pauseOnHover?: boolean
    className?: string
}) => {
    console.log('items: ', items)
    const route = useRouter()
    const containerRef = React.useRef<HTMLDivElement>(null)
    const scrollerRef = React.useRef<HTMLUListElement>(null)

    useEffect(() => {
        addAnimation()
    }, [])
    const [start, setStart] = useState(false)
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children)

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem)
                }
            })

            getDirection()
            getSpeed()
            setStart(true)
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === 'left') {
                containerRef.current.style.setProperty(
                    '--animation-direction',
                    'forwards'
                )
            } else {
                containerRef.current.style.setProperty(
                    '--animation-direction',
                    'reverse'
                )
            }
        }
    }
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === 'fast') {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '20s'
                )
            } else if (speed === 'normal') {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '40s'
                )
            } else {
                containerRef.current.style.setProperty(
                    '--animation-duration',
                    '80s'
                )
            }
        }
    }
    return (
        <div
            ref={containerRef}
            className={cn(
                'scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    ' flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
                    start && 'animate-scroll ',
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-zinc-200 dark:border-neutral-600 px-8 py-6 md:w-[450px] cursor-pointer hover:scale-105 bg-gradient-to-t from-accent to-zinc-300 dark:from-neutral-900 dark:to-neutral-700"
                        onClick={() => {
                            route.replace(`/articles/${item.id}`)
                        }}
                        // style={{
                        //     background:
                        //         'linear-gradient(180deg, var(--zinc-200), var(--zinc-600)',
                        // }}
                        key={item.id}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            <span className=" relative z-20 leading-[1.6] text-black dark:text-white font-normal text-xl">
                                {item.quote}
                            </span>
                            <div className="relative z-20 mt-6 flex flex-col justify-center items-start">
                                <span className="flex flex-col gap-1">
                                    <span className=" text-sm sm:text-lg leading-[1.6] text-secondary dark:text-white font-normal">
                                        {item.name}
                                    </span>
                                    <span className=" text-sm sm:text-lg leading-[1.6] text-secondary dark:text-white font-normal">
                                        {item.title}
                                    </span>
                                </span>
                                <span className="relative z-20 text-sm leading-[1.6] text-black dark:text-white font-normal">
                                    <img
                                        src={item.image}
                                        alt="profile"
                                        className="w-full rounded-2xl"
                                    />
                                </span>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    )
}

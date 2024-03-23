'use client'
import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiCodeforces } from 'react-icons/si'
import { Image } from '@nextui-org/react'

const Footer = () => {
    return (
        <footer className="footer p-10 dark:bg-dark/50 bg-default/50  w-full h-auto">
            <aside>
                <Image
                    src="/assets/fullLogo.svg"
                    width={100}
                    height={100}
                    alt={''}
                ></Image>
                <p>Providing reliable tech since 2024</p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <Link href="#">
                        <FaGithub className="size-10" />
                    </Link>
                    <Link href="#">
                        <FaLinkedin className="size-10" />
                    </Link>
                    <Link href="#">
                        <SiCodeforces className="size-10" />
                    </Link>
                </div>
            </nav>
        </footer>
    )
}

export default Footer

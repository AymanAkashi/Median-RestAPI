import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Providers from './providers'
import Image from 'next/image'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiCodeforces } from 'react-icons/si'
import Link from 'next/link'
import DarkMode from '@/components/DarkMode'

const inter = Inter({ subsets: ['latin'] })
const firaSans = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Median',
    description: 'New way to share your thoughts',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={` ${firaSans.className} bg-white text-black dark:bg-background_dark  dark:text-white transition-all duration-100 delay-75 flex flex-col min-h-screen justify-center`}
            >
                <Providers>
                    {/* <Navbar /> */}
                    {children}
                    <DarkMode />
                </Providers>
            </body>
        </html>
    )
}

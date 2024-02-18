import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Providers from './providers'

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
                className={` ${firaSans.className} bg-white text-black dark:bg-background_dark  dark:text-white transition-all all duration-100 delay-75`}
            >
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}

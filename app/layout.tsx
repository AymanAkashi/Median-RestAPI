import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

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
        <html lang="en">
            <body className={` ${firaSans.className}`}>
                <Navbar />
                {children}
            </body>
        </html>
    )
}

import React from 'react'
import Home from '@/components/Home'
import Navbar from '@/components/Navbar'
import { ModeToggle } from '@/components/DarkMode'

const page = () => {
    return (
        <div>
            <Navbar />
            <Home />
        </div>
    )
}

export default page

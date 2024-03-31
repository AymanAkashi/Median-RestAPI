'use client'
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

const DarkMode = () => {
    const [darkMode, setDarkMode] = React.useState(false)
    return (
        <button
            className="fixed bottom-1 left-1 z-20 p-2 bg-white dark:bg-background_dark rounded-full shadow-md transition-colors duration-1000 delay-75 hover:shadow-lg dark:hover:shadow-lg animate-spin-slow"
            type="button"
            title="Dark Mode"
            onClick={() => {
                localStorage.setItem('theme', darkMode ? 'light' : 'dark')
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
    )
}

export default DarkMode

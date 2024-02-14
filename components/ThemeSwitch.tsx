'use client'
import React from 'react'
import { CgDarkMode, CgSmartHomeLight } from 'react-icons/cg'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
    const [mounted, setMounted] = React.useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    React.useEffect(() => setMounted(true), [])

    if (!mounted)
        return (
            <div className="w-8 h-8 rounded-full bg-primary dark:bg-primary_dark animate-pulse"></div>
        )
    if (resolvedTheme === 'dark') {
        return (
            <CgDarkMode
                className="w-8 h-8 text-primary"
                onClick={() => {
                    setTheme('light')
                }}
            />
        )
    }
    return (
        <CgSmartHomeLight
            className="w-8 h-8 text-primary"
            onClick={() => {
                setTheme('dark')
            }}
        />
    )
}

export default ThemeSwitch

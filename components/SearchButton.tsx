'use client'
import React from 'react'
import { LuSearch } from 'react-icons/lu'

const SearchButton = () => {
    const [iconStyle, seticonStyle] = React.useState(
        'w-8 h-8 bg-transparent placeholder-transparent cursor-pointer'
    )

    const [search, setSearch] = React.useState('')
    return (
        <div className="relative w-12 sm:w-24 md:w-72  h-8 sm:h-10 flex justify-end items-center group ">
            <div className="absolute  z-0 bg-primary w-8 h-8 rounded-full flex justify-center items-center group-hover:text-primary group-hover:bg-secondary transition-all delay-75 duration-100 group-focus-within:hidden">
                <LuSearch className="w-6 h-6" />
            </div>
            <input
                id="search"
                type="text"
                title="search"
                placeholder="Search"
                autoSave="off"
                autoComplete="off"
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                value={search}
                onBlur={(e) => {
                    e.preventDefault()
                    seticonStyle(
                        'w-8 h-8 bg-transparent placeholder-transparent cursor-pointer'
                    )
                    document.getElementById('search').value = ''
                }}
                onFocus={() => {
                    seticonStyle(
                        'w-24 sm:w-32 md:w-44 h-8 bg-transparent border-2 border-primary px-2 placeholder cursor-text'
                    )
                }}
                className={`${iconStyle}   text-black text-sm font-thin rounded-full flex justify-center items-center transition-all delay-75 duration-100 outline-none z-10 group-hover:block placeholder-opacity-40 `}
            />
        </div>
    )
}

export default SearchButton

'use client'
import { Article } from '@/app/types/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { LuSearch } from 'react-icons/lu'

const SearchButton = () => {
    const [iconStyle, seticonStyle] = React.useState(
        'w-8 h-8 bg-transparent placeholder-transparent cursor-pointer'
    )
    const [articles, setArticles] = React.useState<Article[] | null>(null)
    const {
        mutate: findArticles,
        isError,
        isPending,
    } = useMutation({
        mutationKey: ['search', 'articles'],
        onMutate: async (search: string) => {
            const { data } = await axios.get(`/api/articles/search/${search}`)
            setArticles(data)
        },
    })

    const [search, setSearch] = React.useState('')
    return (
        <div className="relative w-auto h-8 sm:h-10 flex justify-end items-center group ">
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
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    }
                }}
                onChange={(e) => {
                    setSearch(e.target.value)
                    findArticles(e.target.value)
                }}
                onBlur={(e) => {
                    e.preventDefault()
                    e.target.value = ''
                    setSearch('')
                    seticonStyle(
                        'w-8 h-8 bg-transparent placeholder-transparent cursor-pointer'
                    )
                    // document.getElementById('search').value = ''
                }}
                onFocus={() => {
                    seticonStyle(
                        'w-28 sm:w-52 lg:w-80 h-8 bg-white border-2 border-primary px-2 placeholder cursor-text '
                    )
                }}
                className={`${iconStyle}   text-black text-sm font-thin rounded-full flex justify-center items-center transition-all delay-75 duration-100 outline-none z-10 group-hover:block placeholder-opacity-40 `}
            />
            {search.length > 0 && (
                <div className="top-[101%] absolute w-28 sm:w-52 lg:w-80 max-h-44 bg-white text-secondary rounded-xl flex-col justify-start items-center border border-primary">
                    {isPending && <div>Loading...</div>}
                    {articles == null && <div>Not Found</div>}
                    {articles != null &&
                        articles.map((article: Article) => (
                            <Link
                                className=" text-sm hover:bg-secondary text-secondary hover:text-primary p-1 rounded-xl w-full flex items-center justify-start transition-all delay-75 duration-100 px-1 py-2"
                                key={article.id}
                                href={`/articles/${article.id}`}
                            >
                                {article.title.slice(0, 20)}
                            </Link>
                        ))}
                </div>
            )}
        </div>
    )
}

export default SearchButton

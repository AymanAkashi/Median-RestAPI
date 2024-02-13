'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import CardArticle from './CardArticle'

const articles = () => {
    const [articles, setArticles] = React.useState([])

    const fetchingData = async () => {
        const { data } = await axios.get('/api/articles')
        setArticles(data)
    }

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchingData,
    })

    return (
        <div className="w-full h-full">
            <div className="flex justify-center items-center h-full mt-2">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold mt-2">Articles</h1>
                    {isLoading ? (
                        <div className="skeleton w-full h-40 sm:w-96 sm:h-60 m-auto flex justify-center items-center ">
                            <div className="skeleton w-4/5 h-4/5 bg-accent/20"></div>
                        </div>
                    ) : articles.length == 0 ? (
                        <p>No Articles here</p>
                    ) : (
                        <ul>
                            {articles.map((article: any) => (
                                <li key={article.id}>
                                    <CardArticle {...article} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default articles

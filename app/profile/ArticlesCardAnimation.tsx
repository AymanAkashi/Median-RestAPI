'use client'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import NoArticle from './noArticles'
import Loading from '../loading'
import { useEffect, useState } from 'react'
import { Article, Item } from '../types/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function ArticlesCardAnimation({ id }: { id: number }) {
    console.log('id:', id)
    const [items, setItems] = useState<Item[]>([])
    const { data: articles, isLoading: loadingArticles } = useQuery({
        queryKey: ['articles', 'me'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/articles/${id}/articles`)
            return data
        },
    })
    useEffect(() => {
        if (!loadingArticles) {
            console.log('articles:', articles)
            articles.map((article: Article) => {
                setItems((items) => [
                    ...items,
                    {
                        quote: article.title,
                        name: article.author,
                        title: article.description,
                        image: article.image,
                        id: article.id,
                    },
                ])
            })
        }
    }, [loadingArticles])
    return (
        <div className="h-[40rem] rounded-md flex antialiased dark:bg-grid-white/[0.05] items-center justify-center relative w-4/5">
            {loadingArticles ? (
                <Loading />
            ) : items.length > 0 ? (
                <InfiniteMovingCards
                    items={items}
                    direction="right"
                    speed="normal"
                    className="w-full h-full"
                />
            ) : (
                <NoArticle />
            )}
        </div>
    )
}

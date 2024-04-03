import React from 'react'
import { Article } from '../types/types'
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover'

const Slides = ({ Article }: { Article: Partial<Article> }) => {
    return (
        <div className="h-full w-full">
            <DirectionAwareHover
                imageUrl={Article.image != undefined ? Article.image : ''}
            >
                <p className="font-bold text-2xl">{Article.title}</p>
                <p className="text-lg">{Article.description}</p>
            </DirectionAwareHover>
        </div>
    )
}

export default Slides

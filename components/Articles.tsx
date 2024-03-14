import React from 'react'
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react'
import { Article } from '@/app/types/types'
const Articles = (article: Article) => {
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{article.title}</h4>
                <p className="text-tiny uppercase font-bold">
                    {article.description.slice(0, 20)}
                </p>
                <small className="text-default-500">{article.tags}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={article.image}
                    width={270}
                />
            </CardBody>
        </Card>
    )
}

export default Articles

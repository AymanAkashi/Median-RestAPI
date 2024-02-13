export type User = {
    id: number
    name: string
    email: string
    password: string
    createdAt: string
    updatedAt: string
}

export type Article = {
    id: number
    title: string
    description: string
    body: string
    Likes: number
    Tags: string
    author: any
    createdAt: string
    updatedAt: string
}

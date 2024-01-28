'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Dashboard = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const { data } = await axios.get('/articles')
            return data
        },
    })
    if (isLoading) return <div>Loading...</div>
    return <div></div>
}

export default Dashboard

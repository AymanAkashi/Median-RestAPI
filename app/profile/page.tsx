import React, { Profiler } from 'react'
import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import Profile from './profile'

const page = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex justify-center items-center">
            <div className="w-1/2 h-1/2 bg-accent/20 rounded-lg flex flex-col justify-center items-center p-2">
                <div className="flex justify-start items-start w-96">
                    <div className="h-8 w-20 bg-secondary/10 rounded-t-xl text-center flex-1 flex justify-center items-center">
                        Profile
                    </div>
                    <div className="h-8 w-20 bg-accent/0 rounded-t-xl flex justify-center items-center">
                        Account
                    </div>
                </div>
                <div className="min-h-96 w-96 bg-secondary/10 rounded-b-2xl rounded-e-2xl flex justify-center items-center">
                    <Profile />
                </div>
            </div>
        </div>
    )
}

export default page

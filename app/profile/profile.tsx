import React from 'react'
import { useForm } from 'react-hook-form'
import { SignUp } from '../types/types'

type ProfileType = {
    name: string
    email: string
    oldPassword: string
    newPassword: string
    confirmPassword: string
    avatar: File | null
}

const profile = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-3 w-full min-h-full">
            <div className="col-span-1 row-span-2 rounded-full">
                <div className="h-20 w-20 rounded-full bg-slate-200"></div>
            </div>
            <div className="col-start-2 col-end-4 row-span-3 space-y-2">
                <div className="w-full h-10 rounded-full bg-secondary"></div>
                <div className="w-full h-10 rounded-full bg-secondary"></div>
            </div>
        </div>
    )
}

export default profile

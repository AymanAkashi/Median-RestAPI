'use client'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
// import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import Image from 'next/image'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'
import { FormStyle, inputStyle, buttonStyle, switchTextStyle } from '../style'
import {
    UseFormRegister,
    UseFormResetField,
    set,
    useForm,
} from 'react-hook-form'

import { SignUp } from '@/app/types/types'
import { Concert_One } from 'next/font/google'

const profile = {
    avatar: '',
}

function UploadNewAvatar({
    setImage,
    defaultImage,
    register,
    resetField,
    className,
}: {
    setImage: (image: string) => void
    defaultImage: string
    register: any
    resetField: any
    className: string
}) {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [fileSelected, setFileSelected] = React.useState(false)
    const { ref: refCall, ...rest } = register('avatar')

    return (
        <>
            <button
                className={`rounded-3xl w-8 h-8  bg-primary/50 hover:bg-primary hover:text-background transition-all ${className}`}
                onClick={() => {
                    inputRef.current?.click()
                }}
                type="button"
            >
                <div className="relative flex justify-center items-center w-full h-full">
                    <MdEdit className="inline peer w-4/5 h-4/5 rounded-full text-secondary" />
                </div>
            </button>
            <input
                {...register('avatar', {
                    onChange: () => {
                        setFileSelected(inputRef.current?.files?.length === 1)
                        if (!inputRef.current) return
                        console.log(inputRef.current.files)
                        const file = inputRef.current.files?.[0]
                        if (!file) return
                        const fileUrl = URL.createObjectURL(file)
                        setImage(fileUrl || defaultImage)
                        defaultImage = fileUrl
                    },
                })}
                type="file"
                className="hidden"
                ref={(input) => {
                    refCall(input)
                    inputRef.current = input
                }}
                accept="image/*"
            />
        </>
    )
}

export default function Page() {
    const [error, setError] = React.useState('')
    const [image, setImage] = React.useState(() => profile.avatar)

    function UploadAvatar({
        register,
        resetField,
    }: {
        register: UseFormRegister<SignUp>
        resetField: UseFormResetField<SignUp>
    }) {
        React.useEffect(() => {
            console.log('image', image)
        }, [image])
        return (
            <div className="relative bg-secondary rounded-full border-2 border-secondary">
                <img
                    src={
                        image === ''
                            ? 'https://images.unsplash.com/placeholder-avatars/extra-large.jpg'
                            : image
                    }
                    alt="avatar"
                    className="w-32 h-32 object-cover rounded-full border-2 border-secondary"
                />
                <UploadNewAvatar
                    className="absolute right-2 bottom-2"
                    resetField={resetField}
                    register={register}
                    setImage={setImage}
                    defaultImage={profile.avatar}
                />
            </div>
        )
    }

    const {
        register,
        handleSubmit,
        resetField,
        getValues,
        formState: { errors },
    } = useForm<SignUp>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            avatar: null,
        },
    })
    const Submiting = async (data: SignUp) => {
        console.log('data', data)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        if (data.avatar) {
            if (data.avatar) {
                formData.append('avatar', data.avatar[0])
            }
        }
        console.log('formData: ', formData)
        const res = await axios
            .post('/api/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.status)
            .catch((err) => setError(err.response.data.message))
        console.log(res)
        if (res === 201) {
            window.location.href = '/home'
        }
    }
    const defaultInput = 'top-1 left-1 text-accent/30 opacity-30'
    const animationInput =
        '-top-5 left-1 text-sm bg-primary dark:bg-primary_dark rounded-full px-1 transition-all duration-200 ease-in-out text-black dark:text-white'

    const [isFocused, setIsFocused] = React.useState([
        defaultInput,
        defaultInput,
        defaultInput,
    ])

    return (
        <div className={FormStyle}>
            <div className="flex justify-center items-center absolute inset-x-0 -top-4 sm:-top-6">
                <Image
                    src="/assets/fullLogo.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className="flex justify-center items-center h-16 w-16 sm:w-20 sm:h-20"
                />
            </div>
            <p className="text-center text-black dark:text-white text-xl font-mono py-2 pb-6 mt-9 sm:text-3xl">
                Sign Up
            </p>
            <form
                method="post"
                onSubmit={handleSubmit(Submiting)}
                className="flex flex-col justify-center items-center space-y-6"
            >
                <div className="flex flex-col justify-center items-center gap-y-2 relative">
                    <UploadAvatar register={register} resetField={resetField} />
                </div>
                <div className="text-red-500 text-sm">
                    {/* A type-safe field component*/}

                    <div className="relative flex flex-col justify-center items-center gap-y-3">
                        <label
                            htmlFor={'name'}
                            className={`absolute ${isFocused[0]} transition-all duration-200 ease-in-out text-black dark:text-white`}
                        >
                            Username
                        </label>
                        <input
                            {...register('name', {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message: 'Minimum length is 3',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Maximum length is 20',
                                },
                            })}
                            placeholder=" "
                            type="text"
                            className={inputStyle}
                            autoComplete="off"
                            onBlur={() => {
                                if (getValues('name') === '') {
                                    setIsFocused([
                                        defaultInput,
                                        isFocused[1],
                                        isFocused[2],
                                    ])
                                }
                            }}
                            onFocus={() => {
                                setIsFocused([
                                    animationInput,
                                    isFocused[1],
                                    isFocused[2],
                                ])
                            }}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="text-red-500 text-sm">
                    <div className="relative flex flex-col justify-center items-center gap-y-2">
                        <label
                            htmlFor={'email'}
                            className={`absolute ${isFocused[1]} transition-all duration-200 ease-in-out text-black dark:text-white`}
                        >
                            Email
                        </label>
                        <input
                            {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email address',
                                },
                                // validate: (value) => {
                                //     if (value === '') {
                                //         return 'This field is required'
                                //     }
                                //     return axios
                                //         .post('/api/auth/validate-email', {
                                //             email: value,
                                //         })
                                //         .then((res) => {
                                //             if (res.status === 200) {
                                //                 return true
                                //             }
                                //         })
                                //         .catch((err) => {
                                //             if (err.response.status === 400) {
                                //                 return 'Email already exists'
                                //             }
                                //         })
                                // },
                            })}
                            type="name"
                            className={inputStyle}
                            autoComplete="off"
                            onBlur={(e) => {
                                if (getValues('email') === '') {
                                    setIsFocused([
                                        isFocused[0],
                                        defaultInput,
                                        isFocused[2],
                                    ])
                                }
                            }}
                            onFocus={(e) => {
                                setError('')
                                e.preventDefault()
                                setIsFocused([
                                    isFocused[0],
                                    animationInput,
                                    isFocused[2],
                                ])
                            }}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="text-red-500 text-sm">
                    <div className="relative flex flex-col justify-center items-center gap-y-2">
                        <label
                            htmlFor={'password'}
                            className={`absolute ${isFocused[2]} transition-all duration-200 ease-in-out text-black dark:text-white`}
                        >
                            Password
                        </label>
                        <input
                            {...register('password', {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: 'Minimum length is 8',
                                },
                                // validate: (value) => {
                                //     const regex =
                                //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
                                //     return (
                                //         regex.test(value) ||
                                //         'Password must contain at least one lowercase letter, one uppercase letter, and one digit'
                                //     )
                                // },
                            })}
                            placeholder=" "
                            className={inputStyle}
                            type="password"
                            autoComplete="off"
                            onBlur={(e) => {
                                if (getValues('password') === '') {
                                    setIsFocused([
                                        isFocused[0],
                                        isFocused[1],
                                        defaultInput,
                                    ])
                                }
                            }}
                            onFocus={(e) => {
                                setError('')
                                setIsFocused([
                                    isFocused[0],
                                    isFocused[1],
                                    animationInput,
                                ])
                            }}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={error !== '' ? true : false}
                    className={buttonStyle}
                >
                    {'Submit'}
                </button>
            </form>
            <Link href="/login" className={switchTextStyle}>
                <p className="">Already have an account?</p>
                <p className="outline-1 text-center">Log in</p>
            </Link>
        </div>
    )
}

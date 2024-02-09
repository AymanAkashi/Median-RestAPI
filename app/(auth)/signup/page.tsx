'use client'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import Image from 'next/image'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export default function Page() {
    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            const data = await axios.post('/auth/signin', value)
            console.log(data)
        },
    })

    const [isFocused, setIsFocused] = React.useState([
        'top-1 left-1 text-accent/50',
        'top-1 left-1 text-accent/50',
        'top-1 left-1 text-accent/50',
    ])

    return (
        <div className="w-64 sm:w-72  border-4 border-secondary rounded-xl bg-[#FAFAFA]/60 p-4 gap-y-14 flex-col justify-center items-center font-medium h-full relative">
            <div className="flex justify-center items-center absolute inset-x-0 -top-6">
                <Image
                    src="/assets/fullLogo.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className="flex justify-center items-center"
                />
            </div>
            <p className="text-center text-black text-3xl font-mono py-2 pb-6 mt-9">
                Sign Up
            </p>
            <form.Provider>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void form.handleSubmit()
                    }}
                    className="flex flex-col justify-center items-center gap-y-6"
                >
                    <div className="text-red-500 text-sm">
                        {/* A type-safe field component*/}
                        <form.Field
                            name="username"
                            validators={{
                                onBlur: ({ value }) =>
                                    !value ? 'user not empty' : undefined,
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) =>
                                        setTimeout(resolve, 1000)
                                    )
                                    if (value.includes('test')) {
                                        return 'user already taken'
                                    }
                                },
                            }}
                            children={(field) => {
                                // Avoid hasty abstractions. Render props are great!
                                return (
                                    <div className="relative flex flex-col justify-center items-center gap-y-3">
                                        <label
                                            htmlFor={field.name}
                                            className={`absolute ${isFocused[0]} transition-all duration-200 ease-in-out text-black`}
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="name"
                                            className="w-52 h-8 border-b-4 border-solid outline-none bg-transparent cursor-text border-secondary focus:border-primary transition-all duration-200 ease-in-out text-black "
                                            autoComplete="off"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={(e) => {
                                                field.handleBlur
                                                if (field.getValue() === '') {
                                                    setIsFocused([
                                                        'top-1 left-1 text-accent/50',
                                                        isFocused[1],
                                                        isFocused[2],
                                                    ])
                                                }
                                            }}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            onFocus={(e) => {
                                                e.preventDefault()
                                                setIsFocused([
                                                    '-top-5 left-1 text-sm bg-white rounded-full px-1 transition-all duration-200 ease-in-out text-black',
                                                    isFocused[1],
                                                    isFocused[2],
                                                ])
                                            }}
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )
                            }}
                        />
                    </div>
                    <div className="text-red-500 text-sm">
                        {/* A type-safe field component*/}
                        <form.Field
                            name="email"
                            validators={{
                                onBlur: ({ value }) =>
                                    !value
                                        ? 'Email is required'
                                        : !value.includes('@')
                                        ? 'must be an email'
                                        : undefined,
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) =>
                                        setTimeout(resolve, 1000)
                                    )
                                    if (value.includes('test')) {
                                        return 'Email already taken'
                                    }
                                },
                            }}
                            children={(field) => {
                                // Avoid hasty abstractions. Render props are great!
                                return (
                                    <div className="relative flex flex-col justify-center items-center gap-y-3">
                                        <label
                                            htmlFor={field.name}
                                            className={`absolute ${isFocused[1]} transition-all duration-200 ease-in-out text-black`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="name"
                                            className="w-52 h-8 border-b-4 border-solid outline-none bg-transparent cursor-text border-secondary focus:border-primary transition-all duration-200 ease-in-out text-black "
                                            autoComplete="off"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={(e) => {
                                                field.handleBlur
                                                if (field.getValue() === '') {
                                                    setIsFocused([
                                                        isFocused[0],
                                                        'top-1 left-1 text-accent/50',
                                                        isFocused[2],
                                                    ])
                                                }
                                            }}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            onFocus={(e) => {
                                                e.preventDefault()
                                                setIsFocused([
                                                    isFocused[0],
                                                    '-top-5 left-1 text-sm bg-white rounded-full px-1 transition-all duration-200 ease-in-out text-black',
                                                    isFocused[2],
                                                ])
                                            }}
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )
                            }}
                        />
                    </div>
                    <div className="text-red-500 text-sm">
                        <form.Field
                            name="password"
                            validators={{
                                onBlur: ({ value }) =>
                                    !value
                                        ? 'password is required'
                                        : value.length < 8
                                        ? 'at least 8 characters'
                                        : undefined,
                                onChangeAsyncDebounceMs: 500,
                            }}
                            children={(field) => (
                                <div className="relative flex flex-col justify-center items-center gap-y-2">
                                    <label
                                        htmlFor={field.name}
                                        className={`absolute ${isFocused[2]} transition-all duration-200 ease-in-out text-black`}
                                    >
                                        Password
                                    </label>
                                    <input
                                        placeholder=" "
                                        className="w-52 h-8 border-b-4 border-solid outline-none bg-transparent cursor-text border-secondary focus:border-primary transition-all duration-200 ease-in-out text-black"
                                        type="password"
                                        autoComplete="off"
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={(e) => {
                                            field.handleBlur
                                            if (field.getValue() === '') {
                                                setIsFocused([
                                                    isFocused[0],
                                                    isFocused[1],
                                                    'top-1 left-1 text-accent/50',
                                                ])
                                            }
                                        }}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        onFocus={(e) => {
                                            e.preventDefault()
                                            setIsFocused([
                                                isFocused[0],
                                                isFocused[1],
                                                '-top-5 left-1 text-sm bg-white rounded-full px-1 transition-all duration-200 ease-in-out text-black',
                                            ])
                                        }}
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />
                    </div>
                    <form.Subscribe
                        selector={(state) => [
                            state.canSubmit,
                            state.isSubmitting,
                        ]}
                        children={([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="w-24 h-10 flex justify-center items-center m-auto text-center rounded-full transition-all duration-500 bg-gradient-to-t to-secondary via-accent from-primary bg-size-200 bg-pos-0 hover:bg-pos-100 hover:border-r-2 hover:border-l-2 hover:border-black hover:scale-105"
                            >
                                {isSubmitting ? '...' : 'Submit'}
                            </button>
                        )}
                    />
                </form>
            </form.Provider>
            <Link href="/login">
                <p className="text-blue-700/45 hover:outline-1 hover:text-blue-700 transition-all delay-75 text-sm cursor-pointer text-center py-3">
                    Already have an account?
                </p>
            </Link>
        </div>
    )
}

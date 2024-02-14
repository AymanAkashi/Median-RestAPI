'use client'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import Image from 'next/image'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import {
    FormStyle,
    inputStyle,
    buttonStyle,
    switchTextStyle,
} from '@/app/(auth)/style'

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
    const [status, setStatus] = React.useState(false)
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            try {
                const data = await axios
                    .post('/api/auth/login', value)
                    .then((res) => res.status)
                    .catch((err) => console.log(err))
                if (data === 201) {
                    setStatus(true)
                }
            } catch (e) {
                console.log(e)
            }
        },
    })

    React.useEffect(() => {
        if (status) {
            redirect('/home')
        }
    }, [status])

    const [isFocused, setIsFocused] = React.useState([
        'top-1 left-1 text-accent/30 opacity-30',
        'top-1 left-1 text-accent/30 opacity-30',
    ])

    return (
        <div className={FormStyle}>
            <div className="flex justify-center items-center absolute inset-x-0 -top-6">
                <Image
                    src="/assets/fullLogo.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className="flex justify-center items-center"
                />
            </div>
            <p className="text-center text-black dark:text-white text-xl font-mono py-2 pb-6 mt-9 sm:text-3xl">
                Log In
            </p>
            <form.Provider>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void form.handleSubmit()
                    }}
                    className="flex flex-col justify-center items-center space-y-6"
                >
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
                                onBlurAsyncDebounceMs: 500,
                                onBlurAsync: async ({ value }) => {
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
                                            className={`absolute ${isFocused[0]} transition-all duration-200 ease-in-out text-black dark:text-white`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className={inputStyle}
                                            autoComplete="off"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={(e) => {
                                                field.handleBlur
                                                if (field.getValue() === '') {
                                                    setIsFocused([
                                                        'top-1 left-1 text-accent/30 opacity-30',
                                                        isFocused[1],
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
                                                    '-top-5 left-1 text-sm bg-primary dark:bg-primary_dark rounded-full px-1 transition-all duration-200 ease-in-out text-black dark:text-white',
                                                    isFocused[1],
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
                                        className={`absolute ${isFocused[1]} transition-all duration-200 ease-in-out text-black dark:text-white`}
                                    >
                                        Password
                                    </label>
                                    <input
                                        placeholder=" "
                                        className={inputStyle}
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
                                                    'top-1 left-1 text-accent/30 opacity-30',
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
                                                '-top-5 left-1 text-sm bg-primary dark:bg-primary_dark rounded-full px-1 transition-all duration-200 ease-in-out text-black dark:text-white',
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
                                className={buttonStyle}
                            >
                                {isSubmitting ? '...' : 'Login'}
                            </button>
                        )}
                    />
                </form>
            </form.Provider>
            <Link href="/signup" className={switchTextStyle}>
                <p className="">You don't have an account?</p>
                <p className="outline-1 text-center">Sign Up</p>
            </Link>
        </div>
    )
}

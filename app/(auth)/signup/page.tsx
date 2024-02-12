'use client'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import Image from 'next/image'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { FormStyle, inputStyle, buttonStyle, switchTextStyle } from '../style'
import { redirect } from 'next/navigation'

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
    const [error, setError] = React.useState('')

    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            const data = await axios
                .post('/api/auth/signup', {
                    name: value.username,
                    ...value,
                })
                .then((res) => res.status)
                .catch((err) => setError(err.response.data.message))

            if (data === 201) {
                window.location.href = '/login'
            }
        },
    })
    const defaultInput = 'top-1 left-1 text-accent/30 opacity-30'
    const animationInput =
        '-top-5 left-1 text-sm bg-primary rounded-full px-1 transition-all duration-200 ease-in-out text-black'

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
            <p className="text-center text-black text-xl font-mono py-2 pb-6 mt-9 sm:text-3xl">
                Sign Up
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
                            name="username"
                            validators={{
                                onBlur: ({ value }) =>
                                    !value ? 'user not empty' : undefined,
                                onBlurAsyncDebounceMs: 100,
                                onBlurAsync: async ({ value }) => {
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
                                            placeholder=" "
                                            type="name"
                                            className={inputStyle}
                                            autoComplete="off"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={(e) => {
                                                field.handleBlur
                                                if (field.getValue() === '') {
                                                    setIsFocused([
                                                        defaultInput,
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
                                                setError('')
                                                e.preventDefault()
                                                setIsFocused([
                                                    animationInput,
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
                                onBlurAsyncDebounceMs: 100,
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
                                    <div className="relative flex flex-col justify-center items-center gap-y-2">
                                        <label
                                            htmlFor={field.name}
                                            className={`absolute ${isFocused[1]} transition-all duration-200 ease-in-out text-black`}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="name"
                                            className={inputStyle}
                                            autoComplete="off"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={(e) => {
                                                field.handleBlur
                                                if (field.getValue() === '') {
                                                    setIsFocused([
                                                        isFocused[0],
                                                        defaultInput,
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
                                                setError('')
                                                e.preventDefault()
                                                setIsFocused([
                                                    isFocused[0],
                                                    animationInput,
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
                                                    isFocused[1],
                                                    defaultInput,
                                                ])
                                            }
                                        }}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        onFocus={(e) => {
                                            setError('')
                                            e.preventDefault()
                                            setIsFocused([
                                                isFocused[0],
                                                isFocused[1],
                                                animationInput,
                                            ])
                                        }}
                                    />
                                    <FieldInfo field={field} />
                                </div>
                            )}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
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
                                {isSubmitting ? '...' : 'Submit'}
                            </button>
                        )}
                    />
                </form>
            </form.Provider>
            <Link href="/login" className={switchTextStyle}>
                <p className="">Already have an account?</p>
                <p className="outline-1 text-center">Log in</p>
            </Link>
        </div>
    )
}
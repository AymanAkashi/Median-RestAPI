'use client'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm } from '@tanstack/react-form'
import type { FieldApi } from '@tanstack/react-form'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
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
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values.value),
            }).then((res) => {
                if (res.status === 200) {
                    alert('Login Success')
                    window.location.href = '/home'
                } else {
                    alert('Login Fail')
                }
            })
        },
    })

    const [isFocused, setIsFocused] = React.useState([
        'top-1 left-1 text-black/20',
        'top-1 left-1 text-black/20',
    ])

    return (
        <div className="w-64 sm:w-72 bg-black/15  rounded-xl p-4 gap-y-6 flex-col justify-center items-center font-medium h-full drop-shadow-[0_0_15px_#0c464a]">
            <div className="flex justify-center items-center bg-white/10 py-2 w-48 m-auto rounded-2xl">
                <Image
                    src="/assets/logo-name.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className="flex justify-center items-center"
                />
            </div>
            <p className="text-center text-3xl font-mono py-2">Login</p>
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
                            name="email"
                            validators={{
                                onChange: ({ value }) =>
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
                                            className={`absolute ${isFocused[0]} transition-all duration-200 ease-in-out `}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="name"
                                            className="w-52 h-8 border-b-4 border-solid outline-none bg-transparent cursor-text border-cyan-600 focus:border-lime-500 transition-all duration-200 ease-in-out text-black "
                                            autoComplete="off"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={(e) => {
                                                field.handleBlur
                                                if (field.getValue() === '') {
                                                    setIsFocused([
                                                        'top-1 left-1 text-black/20',
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
                                                    '-top-5 left-1 text-sm bg-lime-500 rounded-full px-1 transition-all duration-200 ease-in-out text-black',
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
                                onChange: ({ value }) =>
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
                                        className={`absolute ${isFocused[1]} transition-all duration-200 ease-in-out text-black`}
                                    >
                                        Password
                                    </label>
                                    <input
                                        placeholder=" "
                                        className="w-52 h-8 border-b-4 border-solid outline-none bg-transparent cursor-text border-cyan-600 focus:border-lime-500 transition-all duration-200 ease-in-out text-black"
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
                                                    'top-1 left-1 text-black/20',
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
                                                '-top-5 left-1 text-sm bg-lime-500 rounded-full px-1 transition-all duration-200 ease-in-out text-black',
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
                                className="w-24 h-10 flex justify-center items-center m-auto text-center rounded-full transition-all duration-500 bg-gradient-to-t to-[#1a7909] via-[#ffe300] from-[#ffa300] bg-size-200 bg-pos-0 hover:bg-pos-100 hover:border-r-2 hover:border-l-2 hover:border-orange-500 hover:scale-105"
                            >
                                {isSubmitting ? '...' : 'Submit'}
                            </button>
                        )}
                    />
                </form>
            </form.Provider>
        </div>
    )
}

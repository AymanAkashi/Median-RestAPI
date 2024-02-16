import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { FieldApi } from '@tanstack/react-form'
import { buttonStyle } from '@/app/(auth)/style'

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <p className="text-red-500 text-xs">
                    {field.state.meta.touchedErrors}
                </p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="text-green-500 text-xs">Posting...</p>
            ) : null}
        </>
    )
}

const CreateArticle = () => {
    const [error, setError] = React.useState('')
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            body: '',
            Tags: [''],
            image: '',
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })

    return (
        <div className="min-w-[600px] flex justify-center items-center dark:bg-background_dark/70 bg-white/70 shadow-2xl dark:shadow-[0_5px_8px#AFAFAF888] rounded-2xl p-2 ">
            <form.Provider>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void form.handleSubmit()
                    }}
                    className="flex flex-col justify-center items-center space-y-4 w-full h-full "
                >
                    {/* Uploading image here */}
                    <div className="w-full">
                        <form.Field
                            name="image"
                            validators={{
                                onBlur: ({ value }) => {
                                    !value
                                        ? setError('An image is required')
                                        : undefined
                                    return null
                                },
                                onChangeAsyncDebounceMs: 500,
                            }}
                            children={(field) => {
                                // Avoid hasty abstractions. Render props are great!
                                return (
                                    <div className="flex flex-col justify-center items-center group space-y-2">
                                        <label
                                            htmlFor={field.name}
                                            className="group-focus-within:bg-primary group-focus-within:scale-110 px-1 rounded-full transition-all duration-300 ease-in-out outline-none select-none dark:group-focus-within:bg-primary_dark dark:group-focus-within:text-background_dark group-focus-within:text-primary_dark "
                                        >
                                            Image
                                        </label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className="w-4/5 border-b-4 border-solid bg-transparent outline-none cursor-text  px-3 py-1 border-secondary dark:border-accent group-focus-within:border-primary"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )
                            }}
                        />
                    </div>
                    <div className="w-full ">
                        {/* A type-safe field component*/}
                        <form.Field
                            name="title"
                            validators={{
                                onBlur: ({ value }) => {
                                    !value
                                        ? setError('A title is required')
                                        : value.length < 3
                                        ? setError(
                                              'title must be at least 3 characters'
                                          )
                                        : undefined
                                    return null
                                },

                                onChangeAsyncDebounceMs: 500,
                            }}
                            children={(field) => {
                                // Avoid hasty abstractions. Render props are great!
                                return (
                                    <div className="flex flex-col justify-center items-center group space-y-2">
                                        <label
                                            htmlFor={field.name}
                                            className="group-focus-within:bg-primary group-focus-within:scale-110 px-1 rounded-full transition-all duration-300 ease-in-out outline-none select-none dark:group-focus-within:bg-primary_dark dark:group-focus-within:text-background_dark group-focus-within:text-primary_dark "
                                        >
                                            Title
                                        </label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className="w-4/5  border-b-4 text-3xl  border-solid bg-transparent outline-none cursor-text  px-3 py-1 border-secondary dark:border-accent  bg-secondary dark:bg-accent rounded-xl  group-focus-within:border-primary"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )
                            }}
                        />
                    </div>
                    <div className="w-full">
                        {/* A type-safe field component*/}
                        <form.Field
                            name="description"
                            validators={{
                                onBlur: ({ value }) => {
                                    !value
                                        ? setError('A description is required')
                                        : value.length < 12
                                        ? setError(
                                              'description must be at least 12 characters'
                                          )
                                        : undefined
                                    return null
                                },
                                onChangeAsyncDebounceMs: 500,
                            }}
                            children={(field) => {
                                // Avoid hasty abstractions. Render props are great!
                                return (
                                    <div className="flex flex-col justify-center items-center group space-y-2">
                                        <label
                                            htmlFor={field.name}
                                            className="text-xm group-focus-within:bg-primary group-focus-within:scale-110 px-1 rounded-full transition-all duration-300 ease-in-out outline-none select-none dark:group-focus-within:bg-primary_dark dark:group-focus-within:text-background_dark group-focus-within:text-primary_dark "
                                        >
                                            Description
                                        </label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className=" w-4/5 border-b-4 border-solid bg-secondary dark:bg-accent rounded-xl outline-none cursor-text  px-3 py-1 border-secondary dark:border-accent group-focus-within:border-primary"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )
                            }}
                        />
                    </div>
                    <div className="w-full">
                        {/* A type-safe field component*/}
                        <form.Field
                            name="body"
                            validators={{
                                onBlur: ({ value }) => {
                                    !value
                                        ? setError('A body is required')
                                        : value.length < 150
                                        ? setError(
                                              'body must be at least 150 characters'
                                          )
                                        : undefined
                                    return null
                                },
                                onChangeAsyncDebounceMs: 500,
                            }}
                            children={(field) => {
                                // Avoid hasty abstractions. Render props are great!
                                return (
                                    <div className="flex flex-col justify-center items-center group space-y-2">
                                        <label
                                            htmlFor={field.name}
                                            className="text-xm group-focus-within:bg-primary group-focus-within:scale-110 px-1 rounded-full transition-all duration-300 ease-in-out outline-none select-none dark:group-focus-within:bg-primary_dark dark:group-focus-within:text-background_dark group-focus-within:text-primary_dark "
                                        >
                                            Body
                                        </label>
                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className="h-40 w-4/5 outline-none cursor-text p-2 text-xs font-light rounded-2xl flex-col justify-center items-center border-b-4 border-solid bg-secondary dark:bg-accent  px-3 py-1 border-secondary dark:border-accent group-focus-within:border-primary"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )
                            }}
                        />
                    </div>
                    <div className="w-full">
                        {/* A type-safe field component*/}
                        <form.Field
                            name="Tags"
                            validators={{
                                onChange: ({ value }) => {
                                    !value.includes('#')
                                        ? setError('A Tags must start with `#`')
                                        : value.length < 3
                                        ? setError(
                                              'Tags must be at least 3 characters'
                                          )
                                        : undefined
                                    return null
                                },
                                onChangeAsyncDebounceMs: 500,
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) =>
                                        setTimeout(resolve, 1000)
                                    )
                                    return (
                                        value.includes('error') &&
                                        'No "error" allowed in first name'
                                    )
                                },
                            }}
                            children={(field) => {
                                // Avoid hasty abstractions. Render props are great!
                                return (
                                    <div className="flex flex-col justify-center items-center w-full group  space-y-2">
                                        <label
                                            htmlFor={field.name}
                                            className="text-xm group-focus-within:bg-primary group-focus-within:scale-110 px-1 rounded-full transition-all duration-300 ease-in-out outline-none select-none dark:group-focus-within:bg-primary_dark dark:group-focus-within:text-background_dark group-focus-within:text-primary_dark "
                                        >
                                            Tags
                                        </label>
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            className="w-4/5 border-b-4 border-solid bg-transparent outline-none cursor-text  px-3 py-1 border-secondary dark:border-accent group-focus-within:border-primary"
                                        />
                                        <FieldInfo field={field} />
                                    </div>
                                )
                            }}
                        />
                    </div>
                    {error && (
                        <p className=" alert alert-error  w-4/5 flex justify-between items-center">
                            {error}
                            <button
                                type="button"
                                title="remove"
                                onClick={(e) => setError('')}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        </p>
                    )}
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
        </div>
    )
}

export default CreateArticle

'use client'
import React, { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import axios from 'axios'
import { MdCancel } from 'react-icons/md'
import { FieldApi } from '@tanstack/react-form'
import { buttonStyle } from '@/app/(auth)/style'
import DragAndDrop from './DragAndDrop'

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
    // const { mutate } = useMutation({
    //     mutationKey: ['createArticle'],
    //     mutationFn: async (data: any) => {
    //         const res = await axios.post(
    //             'http://localhost:8080/api/articles',
    //             data,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             }
    //         )
    //         return res.data
    //     },
    //     onMutate: async (data) => {
    //         console.log('data: ', data)
    //     },
    //     onError: (error, variables, context) => {
    //         console.log('image: ', file)
    //         console.log('error: ', error)
    //         setError(error.message)
    //     },
    //     onSuccess: (data, variables, context) => {
    //         console.log('Success: ', data)
    //     },
    // })

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['author'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/api/auth/user')
            return res.data || null
        },
    })

    useEffect(() => {
        if (isSuccess) {
            console.log('image: ', file)

            console.log('data: ', data)
        }
        if (isError) {
            console.log('image: ', file)
            console.log('error: ', isError)
        }
    }, [isSuccess, isError])

    const [error, setError] = React.useState('')
    const [file, setFile] = React.useState<any>(null)
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            body: '',
            tags: [''],
            published: true,
        },

        onSubmit: async ({ value }) => {
            const formData = new FormData()
            formData.append('image', file)
            formData.append('title', value.title)
            formData.append('description', value.description)
            formData.append('body', value.body)
            formData.append('tags', value.tags.join(',')) // Convert array to string
            formData.append('published', String(value.published)) // Convert boolean to string
            formData.append('author', data?.name)
            formData.append('authorId', String(data?.id))
            console.log('formData: ', formData)
            const res = await axios
                .post('/api/articles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    res.status === 200
                        ? setError('Article created successfully')
                        : setError(res.statusText)
                })
                .catch((error) => {
                    setError(error.message)
                    console.log('Error: ', error)
                })
        },
    })

    return (
        <div className="min-w-[600px] flex flex-col justify-center items-center dark:bg-background_dark/70 bg-white/30 shadow-2xl dark:shadow-[0_5px_8px#AFAFAF888] rounded-2xl p-2 ">
            {isLoading ? (
                <div className="w-full h-full bg-accent  skeleton">
                    <div className="w-4/5 min-h-[600px] skeleton rounded-2xl bg-accent flex flex-col justify-center items-center"></div>
                </div>
            ) : (
                <>
                    {file != null ? (
                        <div className="w-96 h-48 relative">
                            <button
                                type="button"
                                title="remove"
                                onClick={(e) => setFile(null)}
                                className="w-8 h-8 absolute top-1 right-1 hover:scale-110 transition-all duration-300 ease-in-out  rounded-full p-1  dark:text-primary_dark  text-white hover:text-red-600 dark:hover:text-red-600 "
                            >
                                <MdCancel className="w-full h-full border rounded-full" />
                            </button>
                            <img
                                src={URL.createObjectURL(file)}
                                alt="image"
                                className="w-full h-full rounded-2xl object-cover"
                            />
                        </div>
                    ) : (
                        <DragAndDrop user="exampleUser" setFile={setFile} />
                    )}

                    <form.Provider>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                form.handleSubmit()
                            }}
                            className="flex flex-col justify-center items-center space-y-4 w-full h-full "
                        >
                            <div className="w-full ">
                                {/* A type-safe field component*/}
                                <form.Field
                                    name="title"
                                    validators={{
                                        onBlur: ({ value }) => {
                                            !value
                                                ? setError(
                                                      'A title is required'
                                                  )
                                                : value.length < 3
                                                ? setError(
                                                      'title must be at least 3 characters'
                                                  )
                                                : undefined
                                            return null
                                        },

                                        onBlurAsyncDebounceMs: 500,
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
                                                    className="w-4/5  border-b-4 text-3xl outline-none cursor-text  rounded-2xl border-solid dark:bg-secondary bg-accent/80  px-3 py-1 border-secondary dark:border-accent  group-focus-within:border-primary text-center"
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
                                                ? setError(
                                                      'A description is required'
                                                  )
                                                : value.length < 12
                                                ? setError(
                                                      'description must be at least 12 characters'
                                                  )
                                                : undefined
                                            return null
                                        },
                                        onBlurAsyncDebounceMs: 500,
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
                                                    className=" w-4/5 border-b-4 outline-none select-none rounded-2xl border-solid dark:bg-secondary bg-accent/80  px-3 py-1 border-secondary dark:border-accent  group-focus-within:border-primary"
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
                                        onBlurAsyncDebounceMs: 500,
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
                                                    className="h-40 w-4/5 outline-none cursor-text p-2 text-xs font-light rounded-2xl flex-col justify-center items-center border-b-4 border-solid dark:bg-secondary bg-accent/80  px-3 py-1 border-secondary dark:border-accent  group-focus-within:border-primary"
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
                                    name="tags"
                                    validators={{
                                        onBlur: ({ value }) => {
                                            // !value.includes('#')
                                            //     ? setError('A Tags must start with `#`')
                                            //     : value.length < 3
                                            //     ? setError(
                                            //           'Tags must be at least 3 characters'
                                            //       )
                                            //     : undefined
                                            return null
                                        },
                                        onBlurAsyncDebounceMs: 500,
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
                                                        field.state.value
                                                            .length > 1
                                                            ? field.handleChange(
                                                                  [
                                                                      ...field
                                                                          .state
                                                                          .value,
                                                                      e.target
                                                                          .value,
                                                                  ]
                                                              )
                                                            : field.handleChange(
                                                                  [
                                                                      e.target
                                                                          .value,
                                                                  ]
                                                              )
                                                    }
                                                    className="w-4/5 border-b-4 border-solid rounded-2xl select-none outline-none  dark:bg-secondary bg-accent/80  px-3 py-1 border-secondary dark:border-accent  group-focus-within:border-primary"
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
                                    name="published"
                                    validators={{}}
                                    children={(field) => {
                                        // Avoid hasty abstractions. Render props are great!
                                        return (
                                            <div className="flex  justify-between items-end w-full h-12  group  space-y-2">
                                                <p
                                                    className={`${
                                                        error
                                                            ? 'alert alert-error'
                                                            : ''
                                                    }  w-3/5 h-12 flex justify-between items-center ml-16`}
                                                >
                                                    {error && (
                                                        <>
                                                            {error}
                                                            <button
                                                                type="button"
                                                                title="remove"
                                                                onClick={(e) =>
                                                                    setError('')
                                                                }
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
                                                        </>
                                                    )}
                                                </p>
                                                <div>
                                                    <label
                                                        htmlFor={field.name}
                                                        className={`text-sm text-center align-middle flex justify-center items-center h-full ${
                                                            field.state.value
                                                                ? 'text-primary dark:text-primary_dark'
                                                                : ''
                                                        }`}
                                                    >
                                                        Published
                                                    </label>
                                                    <input
                                                        id={field.name}
                                                        name={field.name}
                                                        onBlur={
                                                            field.handleBlur
                                                        }
                                                        onChange={(e) =>
                                                            field.state
                                                                .value === true
                                                                ? field.handleChange(
                                                                      false
                                                                  )
                                                                : field.handleChange(
                                                                      true
                                                                  )
                                                        }
                                                        checked={
                                                            field.state.value
                                                        }
                                                        type="checkbox"
                                                        className={`flex justify-center items-center toggle toggle-md checked:bg-primary dark:checked:bg-primary_dark   rounded-2xl select-none outline-none   border-secondary dark:border-background_dark `}
                                                    />
                                                    <FieldInfo field={field} />
                                                </div>
                                            </div>
                                        )
                                    }}
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
                                        {isSubmitting ? '...' : 'Submit'}
                                    </button>
                                )}
                            />
                        </form>
                    </form.Provider>
                </>
            )}
        </div>
    )
}

export default CreateArticle

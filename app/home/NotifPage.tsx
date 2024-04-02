import React from 'react'

const NotifPage = () => {
    return (
        <div className="w-4/5 h-96 rounded-2xl bg-zinc-100 m-auto mt-6 flex justify-center relative">
            <div className="w-full h-96 bg-slate-500 absolute ">
                <h1 className="text-2xl text-center">Notifications Page</h1>
                <p className="text-center">This is the notification page</p>
            </div>
            <div className="w-full h-96 bg-yellow-500 absolute left-[100%]"></div>
            <div className="w-full h-96 bg-purple-500 absolute left-[200%]"></div>
        </div>
    )
}

export default NotifPage

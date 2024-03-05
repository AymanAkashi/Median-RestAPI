import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as Minio from 'minio'
import axios from 'axios'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // console.log(request.cookies.get('access_token'))
    // if request is to /profile/*
    const data = await fetch('localhost:8080/api/auth/verify')
        .then((res) => res.status)
        .catch((err) => {
            console.log(err)
            return false
        })
    console.log(data)
    const regex = /\/api\/profile\/.*/
    console.log(request.nextUrl.pathname)
    if (!data && request.nextUrl.pathname === '/profile') {
        return NextResponse.redirect(new URL('/home', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as Minio from 'minio'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // console.log(request.cookies.get('access_token'))
    // if request is to /profile/*
    const data = await fetch('http://localhost:8080/api/auth/verify', {
        headers: {
            'Content-Type': 'application',
        },
        credentials: 'include',
    })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err)
            return false
        })
    const regex = /\/api\/profile\/.*/
    console.log(data)
    if (!data && request.nextUrl.pathname.match(regex))
        return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

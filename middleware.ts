import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    console.log(request.cookies.get('access_token'))
    // if request is to /profile/*
    const data = await fetch('http://localhost:3000/api/auth/verify', {
        headers: {
            'Content-Type': 'application',
        },
        credentials: 'include',
    })
        .then((res) => true)
        .catch((err) => {
            console.log(err)
            return false
        })
    const regex = /\/api\/profile\/.*/
    if (!data && request.nextUrl.pathname.match(regex))
        return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

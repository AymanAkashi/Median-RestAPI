import React from 'react'
import { createClient } from '@supabase/supabase-js'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full sm:min-h-[calc(100vh-3.5rem)] min-h-[calc(100vh-2.5rem)] flex flex-col justify-center items-center">
            {children}
        </div>
    )
}

export default layout

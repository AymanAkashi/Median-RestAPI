import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import { type } from 'os'
import React from 'react'
import { IconType } from 'react-icons'

interface StatProps {
    title: string
    value: string
    discrption: string
    Icon: IconType
}

const Stat = ({ title, value, Icon, discrption }: StatProps) => {
    return (
        <div className="stat w-56  h-28 sm:w-auto sm:h-auto bg-white dark:bg-black">
            <div className="stat-figure text-secondary dark:text-white w-10 h-10 text-3xl">
                <Icon />
            </div>
            <div className="stat-title dark:text-accent">{title}</div>
            <div className="stat-value text-secondary dark:text-white">
                {value}
            </div>
            <div className="stat-desc dark:text-accent">{discrption}</div>
        </div>
    )
}

export default Stat

import Link from 'next/link'

export default function Button({ props }: any) {
    return (
        <div>
            <Link
                href={props.href}
                className="bg-gradient-to-t from-[#3E196E]  to-[#D46C76] hover:bg-[#FFC07C] text-white font-bold text-lg sm:text-2xl py-2 px-4 rounded box flex justify-center items-center w-24 h-10 sm:w-32 sm:h-14 bg-pos-0 hover:bg-pos-100  pointer-events-auto bg-size-200 transition-all duration-500 hover:scale-95 hover:rounded-xl hover:text-[#FFC07C] mt-8"
                title={props.title}
                type="button"
            >
                {props.text}
            </Link>
        </div>
    )
}

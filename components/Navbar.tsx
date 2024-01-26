import { GrContact } from 'react-icons/gr'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="bg-gray-600/10 w-full h-16 flex justify-between items-center text-neutral-800 font-thin rounded-b-3xl shadow-lg">
            <div className="p-1 ml-1 w-14 h-14 flex justify-center items-center bg-white/50 rounded-full">
                <Image
                    src="/assets/logo.svg"
                    alt="Picture of the author"
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex items-center justify-around">
                <a href="#" className="mx-2" title="Home">
                    Home
                </a>
                <a href="#" className="mx-2">
                    About
                </a>
                <a
                    href="#"
                    className="mx-2 flex justify-center items-center transition-all delay-75 duration-150"
                >
                    <GrContact className="inline-block peer hover:text-white transition-all delay-75 duration-150" />
                    {/* <p className='peer-hover:block hover:block hidden transition-all delay-200 duration-150'>Contact</p> */}
                </a>
            </div>
        </nav>
    )
}

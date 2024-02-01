import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
    const itemsStyle =
        'mx-2 sm:mx-4 flex justify-center items-center transition-all delay-75 duration-150 hover:text-yellow-400 hover:scale-105 text-md font-medium hover:font-bold sm:block hidden'

    return (
        <nav
            id="navbar"
            className="bg-default border-b-2 sm:border-b-8 border-black w-full h-12 sm:h-16 flex justify-between items-center  font-thin  shadow-lg z-10 text-white"
        >
            <Link
                href={'/home'}
                className="p-1 ml-1 w-10 h-10 sm:w-14 sm:h-14 flex justify-center items-center  rounded-full z-20 hover:scale-105 cursor-pointer"
            >
                <Image
                    src="/assets/logo.svg"
                    alt="Picture of the author"
                    width={100}
                    height={100}
                />
            </Link>
            <div className="flex items-center justify-around">
                <Link href="#" className={itemsStyle} title="Home">
                    Home
                </Link>
                <div className="mx-2 sm:mx-4 relative w-6 h-6 flex justify-center items-center group sm:hidden transition-all delay-75 duration-100">
                    <Image
                        src="/assets/home-1.svg"
                        alt="Picture of the author"
                        width={100}
                        height={100}
                        className="group-hover:opacity-100 group-hover:scale-90 hover:inline-block absolute inset-0 opacity-0 "
                    />
                    <Image
                        src="/assets/home.svg"
                        alt="Picture of the author"
                        width={100}
                        height={100}
                        className="group-hover:opacity-0 absolute inset-0  opacity-100 sm:hidden"
                    />
                </div>
                <Link href="#" className={itemsStyle}>
                    About
                </Link>
                <div className="mx-2 sm:mx-4 relative w-6 h-6 flex justify-center items-center group sm:hidden transition-all delay-75 duration-100">
                    <Image
                        src="/assets/about-1.svg"
                        alt="Picture of the author"
                        width={100}
                        height={100}
                        className="group-hover:opacity-100 group-hover:scale-90 hover:inline-block absolute inset-0 opacity-0 "
                    />
                    <Image
                        src="/assets/about.svg"
                        alt="Picture of the author"
                        width={100}
                        height={100}
                        className="group-hover:opacity-0 absolute inset-0  opacity-100 sm:hidden"
                    />
                </div>
                <Link href="#" className={itemsStyle}>
                    Contact
                </Link>
                <div className="mx-2 sm:mx-4 relative w-6 h-6 flex justify-center items-center group sm:hidden transition-all delay-75 duration-100">
                    <Image
                        src="/assets/contact-1.svg"
                        alt="Picture of the author"
                        width={100}
                        height={100}
                        className="group-hover:opacity-100 group-hover:scale-90 hover:inline-block absolute inset-0 opacity-0 hover:shadow-red-500"
                    />
                    <Image
                        src="/assets/contact.svg"
                        alt="Picture of the author"
                        width={100}
                        height={100}
                        className="group-hover:opacity-0 absolute inset-0  opacity-100 sm:hidden"
                    />
                </div>
            </div>
        </nav>
    )
}

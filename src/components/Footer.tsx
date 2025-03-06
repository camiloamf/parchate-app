import Link from "next/link";
import { Parisienne } from "next/font/google";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const parisienne = Parisienne({ subsets: ["latin"], weight: ["400"] });

export default function Footer() {
    return (
        <footer className="bg-yellow-400 text-black p-8">
            <div className="flex flex-col items-center text-[#2e294e] w-[90%] mx-auto md:flex-row md:justify-between">

                <div className="flex flex-col items-center md:items-start">
                    <h2 className={`${parisienne.className} text-[96px] font-normal underline decoration-[2px] underline-offset-18`}>
                        Parchate
                    </h2>

                    <div className="hidden md:flex space-x-4 mt-6">
                        <Link href="https://instagram.com" target="_blank">
                            <FaInstagram className="text-3xl hover:text-gray-700" />
                        </Link>
                        <Link href="https://facebook.com" target="_blank">
                            <FaFacebook className="text-3xl hover:text-gray-700" />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-start w-full max-w-xs mt-6 md:mt-0 md:flex-row md:space-x-24">

                    <nav className="space-y-2 text-lg">
                        <Link href="/" className="block hover:underline">
                            Nosotros
                        </Link>
                        <Link href="/explora" className="block hover:underline">
                            Explora
                        </Link>
                        <Link href="/contacto" className="block hover:underline">
                            Contacto
                        </Link>
                    </nav>

                    <div className="mt-6 space-y-1 text-sm md:mt-0">
                        <Link href="/terminos" className="block hover:underline">
                            Términos de Uso
                        </Link>
                        <Link href="/privacidad" className="block hover:underline">
                            Privacidad y Datos
                        </Link>
                        <Link href="/cookies" className="block hover:underline">
                            Uso de Cookies
                        </Link>
                        <Link href="/mapa" className="block hover:underline">
                            Mapa del Sitio
                        </Link>
                    </div>
                </div>

                <div className="flex space-x-4 mt-6 md:hidden self-start">
                    <Link href="https://instagram.com" target="_blank">
                        <FaInstagram className="text-3xl hover:text-gray-700" />
                    </Link>
                    <Link href="https://facebook.com" target="_blank">
                        <FaFacebook className="text-3xl hover:text-gray-700" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
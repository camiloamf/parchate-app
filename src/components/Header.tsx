"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] md:max-w-[90%] md:w-[90%] bg-white border border-gray-300 rounded-[30px] shadow-lg p-4 flex justify-between items-center z-50 md:px-10 md:py-4">
        <Image src={logo} alt="Logo" width={50} height={50} />

        <button
          onClick={() => setOpen(!open)}
          className="text-black text-3xl md:hidden"
        >
          {open ? (
            <span className="text-pink-500 text-5xl">&times;</span>
          ) : (
            <span>☰</span>
          )}
        </button>

        <nav className="hidden md:flex space-x-10 text-black">
          <Link href="/" className="hover:text-pink-500 transition">
            Inicio
          </Link>
          <Link href="/explora" className="hover:text-pink-500 transition">
            Explora
          </Link>
          <Link href="/contacto" className="hover:text-pink-500 transition">
            Contacto
          </Link>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full h-[45vh] bg-white flex flex-col justify-center items-center z-40 shadow-lg rounded-b-[30px] md:hidden"
          >
            <ul className="text-center text-black mt-12 space-y-6">
              <li>
                <Link href="/" onClick={() => setOpen(false)}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/explora" onClick={() => setOpen(false)}>
                  Explora
                </Link>
              </li>
              <li>
                <Link href="/contacto" onClick={() => setOpen(false)}>
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
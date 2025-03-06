"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import bg1Mobile from "../assets/images/mhero1.png";
import bg2Mobile from "../assets/images/mhero2.png";
import bg3Mobile from "../assets/images/mhero3.png";
import bg4Mobile from "../assets/images/mhero4.png";
import bg1Desktop from "../assets/images/dhero1.png";
import bg2Desktop from "../assets/images/dhero2.png";
import bg3Desktop from "../assets/images/dhero3.png";
import bg4Desktop from "../assets/images/dhero4.png";
import { Parisienne } from "next/font/google";
import ReCAPTCHA from "react-google-recaptcha";

const parisienne = Parisienne({ subsets: ["latin"], weight: ["400"] });
const imagesMobile = [bg1Mobile, bg2Mobile, bg3Mobile, bg4Mobile];
const imagesDesktop = [bg1Desktop, bg2Desktop, bg3Desktop, bg4Desktop];

export default function ContactoSection() {
    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isDesktop, setIsDesktop] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % 4);
            setNextIndex((prev) => (prev + 1) % 4);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !message) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (!captchaToken) {
            alert("Por favor, verifica el reCAPTCHA.");
            return;
        }

        const res = await fetch("/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message, captchaToken }),
        });

        const data = await res.json();
        if (data.success) {
            alert("Correo enviado correctamente.");
            setName("");
            setEmail("");
            setMessage("");
        } else {
            alert("Hubo un error al enviar el mensaje.");
        }
    };

    return (
        <section onSubmit={handleSubmit} className="relative flex flex-col items-center text-center px-6 py-16 min-h-screen overflow-hidden md:flex-row md:items-start md:text-left md:gap-16 md:pt-40">
            <div className="absolute inset-0 w-full h-full">
                <motion.div
                    key={index}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={isDesktop ? imagesDesktop[index] : imagesMobile[index]}
                        alt="HeroAnimation"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </motion.div>

                <motion.div
                    key={nextIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 6, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={isDesktop ? imagesDesktop[nextIndex] : imagesMobile[nextIndex]}
                        alt="HeroAnimation"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </motion.div>
            </div>
            <div className="relative z-10 w-full md:max-w-[90%] mx-auto flex flex-col md:flex-row md:gap-10">
                <div className="relative flex flex-col w-full max-w-lg pt-20 md:max-w-none md:w-2/3 md:p-16 md:border-4 md:border-white md:rounded-[20px] md:shadow-lg">
                    <h1 className={`text-[64px] text-white ${parisienne.className} mb-4`}>¿Hablamos?</h1>
                    <p className="text-gray-500 mb-8">Estamos para ti, cuéntanos tus dudas, ¡las resolvemos!</p>

                    <form className="flex flex-col space-y-6">
                        <div className="flex flex-col text-left">
                            <label className="text-white text-sm font-semibold mb-1">Tu nombre</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent border-b border-gray-300 text-white outline-none p-2" />
                        </div>

                        <div className="flex flex-col text-left">
                            <label className="text-white text-sm font-semibold mb-1">Tu correo</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-b border-gray-300 text-white outline-none p-2" />
                        </div>

                        <div className="flex flex-col text-left">
                            <label className="text-white text-sm font-semibold mb-1">Déjanos tu mensaje</label>
                            <textarea
                                className="bg-transparent border-b border-gray-300 text-white outline-none p-2 h-24 resize-none"
                                maxLength={500}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <span className="text-gray-400 text-xs text-right">{message.length}/500</span>
                        </div>

                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6Ld6LOsqAAAAAIpfIzutLDYRRWP7mu7iIWcclDkl"
                            onChange={(token) => setCaptchaToken(token || "")}
                        />

                        <button type="submit" className="bg-[#820263] md:max-w-[40%] text-white py-3 rounded-full text-lg font-semibold cursor-pointer transition duration-300 ease-in-out hover:bg-[#4b416d] active:scale-95">
                            Enviar
                        </button>
                    </form>
                </div>

                <div className="relative w-full max-w-lg mt-16 md:w-1/3 md:mt-0 md:flex md:flex-col md:gap-10">
                    <div>
                        <h2 className="text-white text-[24px] font-bold mb-10 text-center">¡Encuéntranos!</h2>
                        <div className="w-full h-100 overflow-hidden rounded-xl shadow-[0px_4px_10px_#4f4413]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d583.3227639835026!2d18.952038129130965!3d69.65140980141196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45c4c452963e6601%3A0x5372093099e32b5c!2sFontenehuset%20Troms%C3%B8!5e0!3m2!1ses!2sco!4v1741233571643!5m2!1ses!2sco"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    <div className="mt-10 bg-transparent border-4 border-white p-6 rounded-[20px] shadow-lg text-white">
                        <a href="mailto:prachemonos@parchate.co" className="block">
                            <div className="bg-[#eadeda] text-[#2e294e] p-4 rounded-xl mb-4 text-left flex items-center space-x-4 cursor-pointer hover:opacity-80 transition">
                                <img src="/icons/mail.png" alt="Email" />
                                <div>
                                    <p className="text-sm font-semibold">Email</p>
                                    <p className="text-[#2e294e] text-sm">prachemonos@parchate.co</p>
                                </div>
                            </div>
                        </a>

                        <a href="tel:+576024072035" className="block">
                            <div className="bg-[#eadeda] text-[#2e294e] p-4 rounded-xl mb-4 text-left flex items-center space-x-4 cursor-pointer hover:opacity-80 transition">
                                <img src="/icons/call.png" alt="Teléfono" />
                                <div>
                                    <p className="text-sm font-semibold">Teléfono</p>
                                    <p className="text-[#2e294e] text-sm">+57 (602) 407 2035</p>
                                </div>
                            </div>
                        </a>

                        <a href="https://maps.app.goo.gl/qQ5cT9Pwx4yTRazL7" target="_blank" rel="noopener noreferrer" className="block">
                            <div className="bg-[#eadeda] text-[#2e294e] p-4 rounded-xl text-left flex items-center space-x-4 cursor-pointer hover:opacity-80 transition">
                                <img src="/icons/domain.png" alt="Dirección" />
                                <div>
                                    <p className="text-sm font-semibold">Dirección</p>
                                    <p className="text-[#2e294e] text-sm">Fontenehuset Tromsø</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
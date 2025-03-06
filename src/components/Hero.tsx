"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import bg1Mobile from "../assets/images/mhero1.png";
import bg2Mobile from "../assets/images/mhero2.png";
import bg3Mobile from "../assets/images/mhero3.png";
import bg4Mobile from "../assets/images/mhero4.png";
import bg1Desktop from "../assets/images/dhero1.png";
import bg2Desktop from "../assets/images/dhero2.png";
import bg3Desktop from "../assets/images/dhero3.png";
import bg4Desktop from "../assets/images/dhero4.png";
import { Parisienne } from "next/font/google";

const parisienne = Parisienne({ subsets: ["latin"], weight: ["400"] });

const imagesMobile = [bg1Mobile, bg2Mobile, bg3Mobile, bg4Mobile];
const imagesDesktop = [bg1Desktop, bg2Desktop, bg3Desktop, bg4Desktop];

export default function Hero() {
    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isDesktop, setIsDesktop] = useState(false);

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

    const scrollToNextSection = () => {
        const nextSection = document.getElementById("features");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-[930px] flex flex-col items-center justify-center text-center px-4 md:px-0 overflow-hidden">
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
                        alt="Home Hero Animation"
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
                        alt="Home Hero Animation"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </motion.div>
            </div>

            <div className="relative z-10 w-full max-w-[90%] mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="md:w-1/2 md:text-left">
                    <h1 className="text-[64px] leading-tight mb-16 md:mb-4">En la vida, hay que</h1>
                    <h2 className={`text-[90px] ${parisienne.className} leading-none underline decoration-[2px] underline-offset-18`}>
                        Parcharse
                    </h2>
                </div>

                <div className="md:w-1/4 md:text-right">
                    <p className="text-[20px] mt-24 md:mt-0">
                        Somos <strong>Parchate</strong>, y curamos eventos para que tu vida y la de tus seres amados, sean un parche
                    </p>
                </div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute bottom-10 cursor-pointer"
                onClick={scrollToNextSection}
            >
                <Image src="/icons/arrow-icon.svg" alt="Scroll" width={30} height={30} />
            </motion.div>
        </section>
    );
}

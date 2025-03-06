"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import photo1 from "../assets/images/picnic.png";
import photo2 from "../assets/images/stargazing.png";
import photo3 from "../assets/images/hiking.png";
import photo4 from "../assets/images/cafe.png";
import photo5 from "../assets/images/sport.png";

const images = [photo1, photo2, photo3, photo4, photo5];
const positions = [0, 150, 300, 450, 600];
const offsets = [50, -50, 50, -50, 50];

export default function FallingImages() {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prevKey) => prevKey + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      key={animationKey}
      className="relative h-screen w-full bg-[#171717] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute w-full h-full bg-black z-10"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 0, 0, 0.7] }}
        transition={{ duration: 12, ease: "easeInOut" }}
      />

      <motion.div className="absolute w-full h-full flex flex-col items-center">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ y: -200, opacity: 1, scale: 1, filter: "brightness(30%)" }}
            animate={{
              y: [
                -200,
                positions[index],
                positions[index],
                800,
              ],
              x: [
                0,
                offsets[index],
                offsets[index],
                0,
              ],
              opacity: [1, 1, 1, 1],
              scale: [1, 1.1, 1, 1],
              filter: [
                "brightness(30%)",
                "brightness(100%)",
                "brightness(100%)",
                "brightness(30%)",
              ],
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Image
              src={src}
              alt={`Falling image ${index}`}
              width={600}
              height={400}
              className="rounded-lg shadow-none object-contain"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-20 text-center text-white p-8">
        <h2 className="text-[24px] font-bold mb-8">¡Explora todo lo que tenemos para ti!</h2>
        <Link href="/explora">
          <button className="
          w-full bg-[#2e294e] text-white px-6 py-3 rounded-full font-bold text-[20px] 
          cursor-pointer transition duration-300 ease-in-out 
          hover:bg-[#4b416d] active:scale-95
        ">
            ¡Descubre!
          </button>
        </Link>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { sanityClient } from "@/sanity/config";
import { GET_POSTS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/imageUrl";
import { Parisienne } from "next/font/google";
import bg1Mobile from "../assets/images/mhero1.png";
import bg2Mobile from "../assets/images/mhero2.png";
import bg3Mobile from "../assets/images/mhero3.png";
import bg4Mobile from "../assets/images/mhero4.png";
import bg1Desktop from "../assets/images/dhero1.png";
import bg2Desktop from "../assets/images/dhero2.png";
import bg3Desktop from "../assets/images/dhero3.png";
import bg4Desktop from "../assets/images/dhero4.png";

const parisienne = Parisienne({ subsets: ["latin"], weight: ["400"] });

const imagesMobile = [bg1Mobile, bg2Mobile, bg3Mobile, bg4Mobile];
const imagesDesktop = [bg1Desktop, bg2Desktop, bg3Desktop, bg4Desktop];

interface Post {
    _id: string;
    title: string;
    description: string;
    author: string;
    imageUrl: string;
    slug?: string;
}

export default function ExploraSection() {
    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isDesktop, setIsDesktop] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = isDesktop ? 8 : 2;

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

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await sanityClient.fetch(GET_POSTS_QUERY);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden text-[#2E294E]">
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-[#EADEDA]" />

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

            <div className="relative z-10 w-full max-w-2xl md:max-w-[90%] pt-40">
                <h1 className="text-[64px] mb-4">
                    Encuentra tu{" "}
                    <span className={`${parisienne.className} text-[96px]`}>Parche</span>
                </h1>
                <p className="text-[24px] mb-6">
                    Explora nuestra selección de actividades de esta semana
                </p>

                <div className="w-full flex flex-col md:flex-row md:space-x-12">
                    <div className="relative flex items-center border-[3px] border-[#2E294E] rounded-[10px] bg-transparent px-4 py-2 w-full shadow-md md:flex-[4]">
                        <input
                            type="text"
                            placeholder="Busca aquí..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="flex-1 border-none outline-none px-2 text-[#2E294E] bg-transparent"
                        />
                        <button className="p-2">
                            <Image src="/icons/search-icon.svg" alt="Buscar" width={40} height={40} />
                        </button>
                    </div>

                    <div className="w-full flex justify-between items-center mt-6 md:mt-0 border-[3px] border-[#2E294E] rounded-[10px] bg-transparent px-4 py-2 md:flex-[2]">
                        <button
                            className="text-[#2E294E] text-3xl"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                            ‹
                        </button>
                        <div className="flex space-x-4">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-semibold ${currentPage === page
                                        ? "bg-[#2E294E] text-white"
                                        : "text-[#2E294E]"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            className="text-[#2E294E] text-3xl"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-2xl md:max-w-[90%] mt-5 grid grid-cols-1 md:grid-cols-4 gap-6">
                {currentPosts.map((post, index) => (
                    <div key={post._id} className="w-full text-left">
                        {post.imageUrl && (
                            <Image
                                src={urlFor(post.imageUrl).width(800).url()}
                                alt={post.title}
                                width={800}
                                height={400}
                                className="rounded-lg w-full"
                            />
                        )}
                        <div className="px-2 py-4">
                            <h2 className="text-xl font-bold mt-2">{post.title}</h2>
                            <p className="text-sm"><strong>Organizado por:</strong> {post.author}</p>
                            <p className="mt-2">{post.description}</p>
                            <a
                                href={post.slug ? `/post/${post.slug}` : "#"}
                                className={`mt-4 inline-block px-6 py-2 text-white font-bold transition-all ${index % 2 === 0 ? "bg-[#d90368]" : "bg-[#820263]"
                                    }`}
                                style={{ borderRadius: "20px" }}
                            >
                                ¡Me interesa!
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-2xl mb-20">

                <div className="md:hidden w-full flex justify-between items-center mt-6 border-[3px] border-[#2E294E] rounded-[10px] bg-transparent px-4 py-2">
                    <button
                        className="text-[#2E294E] text-3xl"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                        ‹
                    </button>
                    <div className="flex space-x-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-semibold ${currentPage === page
                                    ? "bg-[#2E294E] text-white"
                                    : "text-[#2E294E]"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        className="text-[#2E294E] text-3xl"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}
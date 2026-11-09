
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import HeroBackground from './HeroBackground'

const roles = [
    'Frontend Developer',
    'React Developer',
    'Python Developer',
    'Full Stack Developer',
]

function Hero() {
    const [roleIndex, setRoleIndex] = useState(0)

    const [imageTilt, setImageTilt] = useState({
        rotateX: 0,
        rotateY: 0,
    })

    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const shouldReduceMotion = useReducedMotion()

    // Role animation
    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length)
        }, 2500)

        return () => clearInterval(interval)
    }, [])

    // Profile image 3D interaction
    const handleImageMove = (e) => {
        if (
            shouldReduceMotion ||
            window.matchMedia('(pointer: coarse)').matches
        ) return

        const rect = e.currentTarget.getBoundingClientRect()

        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height

        setImageTilt({
            rotateX: (0.5 - y) * 12,
            rotateY: (x - 0.5) * 12,
        })
    }

    const resetImageTilt = () => {
        setImageTilt({
            rotateX: 0,
            rotateY: 0,
        })
    }

    // Scroll helper
    const scrollToSection = (e, id) => {
        e.preventDefault()

        document.querySelector(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const reveal = {
        hidden: {
            opacity: 0,
            y: 25,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }

    const secondaryText = isDark
        ? 'text-white/55'
        : 'text-[#62566b]'

    const mutedText = isDark
        ? 'text-white/40'
        : 'text-[#756a7c]'

    const cardSurface = isDark
        ? 'border-white/10 bg-[#1d1728]/85'
        : 'border-[#f0dfd2] bg-white/85'

    return (
        <section
            id="home"
            className={`hero-section relative isolate flex w-full items-center overflow-hidden px-6 transition-colors duration-500 md:px-14 ${isDark ? 'bg-[#100d18]' : 'bg-[#fff8f2]'
                }`}
        >
            {/* Interactive 3D Background */}
            <HeroBackground />

            {/* Main Content */}
            <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">

                {/* LEFT CONTENT */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.12,
                            },
                        },
                    }}
                    className="hero-content min-w-0"
                >
                    {/* Availability */}
                    <motion.div
                        variants={reveal}
                        className="mb-6 inline-flex items-center gap-3 rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                        </span>

                        <span className={`text-xs tracking-wide ${secondaryText}`}>
                            Available for opportunities
                        </span>
                    </motion.div>

                    {/* Introduction */}
                    <motion.p
                        variants={reveal}
                        className={`mb-3 text-xs uppercase tracking-[0.3em] sm:text-sm ${mutedText}`}
                    >
                        Hello, I'm Rushikesh Sultane
                    </motion.p>

                    {/* Main Heading */}
                    <motion.h1
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 50,
                                rotateX: -12,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                rotateX: 0,
                                transition: {
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            },
                        }}
                        className={`hero-title font-display font-bold leading-[0.92] tracking-tighter ${isDark ? 'text-white' : 'text-[#292033]'
                            }`}
                    >
                        Building
                        <br />
                        <span className="gradient-text">Digital</span>
                        <br />
                        Experiences<span className="text-[#fb923c]">.</span>
                    </motion.h1>

                    {/* Animated Role */}
                    <motion.div
                        variants={reveal}
                        className="mt-6 flex min-h-8 flex-wrap items-center gap-3"
                    >
                        <span className={`text-sm sm:text-base ${mutedText}`}>
                            I am a
                        </span>

                        <motion.span
                            key={roleIndex}
                            initial={{
                                opacity: 0,
                                y: 12,
                                filter: 'blur(5px)',
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                            }}
                            transition={{ duration: 0.4 }}
                            className="font-display text-base font-semibold text-violet-500 sm:text-lg"
                        >
                            {roles[roleIndex]}
                        </motion.span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={reveal}
                        className={`mt-4 max-w-xl text-sm leading-7 sm:text-base ${secondaryText}`}
                    >
                        I transform ideas into beautiful, interactive and
                        high-performance digital experiences using modern
                        frontend technologies and Python.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        variants={reveal}
                        className="mt-8 flex flex-wrap items-center gap-4"
                    >
                        <Link
                            to="/#projects"
                            onClick={(e) => scrollToSection(e, '#projects')}
                            className="group inline-flex items-center gap-3 rounded-full bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-500 hover:shadow-[0_10px_35px_rgba(139,92,246,0.35)]"
                        >
                            Explore Projects

                            <ArrowUpRight
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>

                        <Link
                            to="/#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className={`rounded-full border px-6 py-3.5 text-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-400 hover:text-orange-500 ${isDark
                                    ? 'border-white/15 text-white/80'
                                    : 'border-[#e7d8ce] text-[#62566b]'
                                }`}
                        >
                            Let's Connect
                        </Link>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        variants={reveal}
                        className="mt-8 flex items-center gap-7"
                    >
                        <a
                            href="https://github.com/rushi-sultane"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm transition-colors hover:text-orange-500 ${mutedText}`}
                        >
                            GitHub ↗
                        </a>

                        <a
                            href="https://www.linkedin.com/in/rushikesh-sultane/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm transition-colors hover:text-violet-500 ${mutedText}`}
                        >
                            LinkedIn ↗
                        </a>
                    </motion.div>
                </motion.div>

                {/* RIGHT PROFILE VISUAL */}
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        x: 30,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: 'easeOut',
                        delay: 0.3,
                    }}
                    onMouseMove={handleImageMove}
                    onMouseLeave={resetImageTilt}
                    className="hero-visual relative mx-auto flex w-full items-center justify-center"
                >
                    {/* Gradient Ambient Glow */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-500/25 via-transparent to-orange-400/25 blur-[90px]" />

                    {/* Decorative Ring */}
                    <motion.div
                        className="absolute h-[85%] w-[85%] rounded-full border border-violet-400/10"
                        animate={shouldReduceMotion ? {} : {
                            rotate: 360,
                        }}
                        transition={{
                            duration: 45,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />

                    {/* Small Accent Orb */}
                    <motion.div
                        className="absolute right-[12%] top-[15%] h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_25px_rgba(251,146,60,0.8)]"
                        animate={shouldReduceMotion ? {} : {
                            y: [0, -12, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Profile Image Floating Wrapper */}
                    <motion.div
                        animate={shouldReduceMotion ? {} : {
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="relative z-10 w-full max-w-[360px]"
                    >
                        {/* Profile Image 3D Frame */}
                        <motion.div
                            animate={{
                                rotateX: imageTilt.rotateX,
                                rotateY: imageTilt.rotateY,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 150,
                                damping: 20,
                            }}
                            style={{
                                transformPerspective: 1000,
                                transformStyle: 'preserve-3d',
                            }}
                            className={`group relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border shadow-[0_20px_80px_rgba(139,92,246,0.18)] ${isDark
                                    ? 'border-violet-400/25 bg-[#15111f]'
                                    : 'border-violet-300/60 bg-white'
                                }`}
                        >
                            {/* Image */}
                            <motion.img
                                src="/images/rs-profile.webp"
                                alt="Rushikesh Sultane - Frontend Developer"
                                fetchPriority="high"
                                decoding="async"
                                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                            />

                            {/* Image Gradient Overlay */}
                            <div
                                className={`absolute inset-0 ${isDark
                                        ? 'bg-gradient-to-t from-[#100d18]/85 via-transparent to-transparent'
                                        : 'bg-gradient-to-t from-black/65 via-transparent to-transparent'
                                    }`}
                            />

                            {/* Inner Border Highlight */}
                            <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/10" />

                            {/* Name */}
                            <div
                                className="absolute bottom-6 left-6"
                                style={{
                                    transform: 'translateZ(35px)',
                                }}
                            >
                                <p className="text-xl font-bold text-white">
                                    Rushikesh Sultane
                                </p>

                                <p className="mt-1 text-sm text-orange-300">
                                    Frontend Developer
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Specialization Glass Card */}
                    <motion.div
                        animate={shouldReduceMotion ? {} : { y: [0, -9, 0] }}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.045, y: -4 }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                            scale: { duration: 0.25 },
                        }}
                        style={{
                            x: imageTilt.rotateY * -0.8,
                            rotateY: imageTilt.rotateY * 0.45,
                            rotateX: imageTilt.rotateX * 0.35,
                            transformPerspective: 800,
                        }}
                        className={`absolute -right-2 top-[18%] z-20 min-w-[158px] rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl sm:-right-8 ${cardSurface}`}
                    >
                        <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-xs font-bold text-violet-500">
                                {'</>'}
                            </span>
                            <span className={`text-[10px] uppercase tracking-[0.16em] ${mutedText}`}>
                                Specialization
                            </span>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-violet-500">
                            React + Python
                        </p>
                        <div className="mt-3 h-1 overflow-hidden rounded-full bg-violet-500/10">
                            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-orange-400" />
                        </div>
                    </motion.div>

                    {/* Creative Mindset Glass Card */}
                    <motion.div
                        animate={shouldReduceMotion ? {} : { y: [0, 9, 0] }}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.045, y: 4 }}
                        transition={{
                            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                            scale: { duration: 0.25 },
                        }}
                        style={{
                            x: imageTilt.rotateY * 0.65,
                            rotateY: imageTilt.rotateY * -0.35,
                            rotateX: imageTilt.rotateX * -0.3,
                            transformPerspective: 800,
                        }}
                        className={`absolute -bottom-4 -left-2 z-20 rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl sm:-left-8 ${cardSurface}`}
                    >
                        <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-400/15 text-orange-500">
                                ✦
                            </span>
                            <span className={`text-[10px] uppercase tracking-[0.16em] ${mutedText}`}>
                                Creative mindset
                            </span>
                        </div>
                        <p className={`mt-3 text-sm font-semibold ${isDark ? 'text-white' : 'text-[#292033]'}`}>
                            Code. Create. Innovate.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero

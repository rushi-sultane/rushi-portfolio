import { m, useReducedMotion } from 'framer-motion'
import {
    ArrowUpRight,
    BriefcaseBusiness,
    Code2,
    GraduationCap,
    Server,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const highlights = [
    {
        value: '2025',
        label: 'Computer Engineering Graduate',
        detail: 'Sant Gadge Baba Amravati University',
        icon: GraduationCap,
        accent: 'violet',
    },
    {
        value: '03+',
        label: 'Months of Internship Experience',
        detail: 'Frontend Developer Intern · DwellAlgo',
        icon: BriefcaseBusiness,
        accent: 'orange',
    },
    {
        value: 'React',
        label: 'Frontend Development',
        detail: 'Responsive interfaces and interactions',
        icon: Code2,
        accent: 'orange',
    },
    {
        value: 'Python',
        label: 'Backend Development',
        detail: 'Python, Django and REST APIs',
        icon: Server,
        accent: 'violet',
    },
]

const technologies = ['React', 'JavaScript', 'Tailwind CSS', 'Python', 'Django', 'REST APIs']

const reveal = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
}

function AboutPreview() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const shouldReduceMotion = useReducedMotion()

    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({
            behavior: shouldReduceMotion ? 'auto' : 'smooth',
            block: 'start',
        })
    }

    return (
        <section
            id="about"
            className={`about-section snap-section relative isolate flex w-full items-center overflow-hidden px-6 py-24 transition-colors duration-500 md:px-14 lg:py-32 ${
                isDark ? 'bg-[#171322] text-white' : 'bg-[#fffaf6] text-[#292033]'
            }`}
        >
            {/* Subtle ambient accents */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-500/[0.08] blur-[100px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-36 right-0 h-80 w-80 rounded-full bg-orange-400/[0.08] blur-[110px]"
            />

            <div className="section-container relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
                {/* LEFT: INTRODUCTION */}
                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.12 },
                        },
                    }}
                    className="max-w-2xl"
                >
                    <m.div variants={reveal} className="mb-6 flex items-center gap-3">
                        <span className="h-px w-8 bg-gradient-to-r from-violet-500 to-orange-400" />
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500 sm:text-sm">
                            02 / About Me
                        </p>
                    </m.div>

                    <m.h2
                        variants={reveal}
                        className={`max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl ${
                            isDark ? 'text-white' : 'text-[#292033]'
                        }`}
                    >
                        Turning ideas into
                        <span className="gradient-text"> meaningful</span>{' '}
                        digital experiences.
                    </m.h2>

                    <m.p
                        variants={reveal}
                        className={`mt-7 max-w-xl text-sm leading-8 md:text-base ${
                            isDark ? 'text-white/65' : 'text-[#62566b]'
                        }`}
                    >
                        I'm Rushikesh Sultane, a Computer Engineering graduate
                        and Frontend Developer Intern at DwellAlgo. I enjoy
                        creating responsive, user-friendly web applications
                        with React and modern frontend technologies. I also
                        work with Python and Django to build backend solutions.
                    </m.p>

                    <m.p
                        variants={reveal}
                        className={`mt-4 max-w-xl text-sm leading-8 md:text-base ${
                            isDark ? 'text-white/45' : 'text-[#756a7c]'
                        }`}
                    >
                        My focus is on writing clean code, exploring new
                        technologies, and building digital products that make
                        everyday interactions feel simple and intuitive.
                    </m.p>

                    <m.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-4">

                        <span className={`text-xs ${isDark ? 'text-white/35' : 'text-[#8a7d8f]'}`}>
                            React · Python · Django
                        </span>
                    </m.div>

                    {/* Technology tags */}
                    <m.div variants={reveal} className="mt-10">
                        <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                            isDark ? 'text-white/35' : 'text-[#8a7d8f]'
                        }`}>
                            Working with
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                                        isDark
                                            ? 'border-white/10 bg-white/[0.035] text-white/60'
                                            : 'border-[#eadfd8] bg-white/75 text-[#62566b]'
                                    }`}
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </m.div>
                </m.div>

                {/* RIGHT: HIGHLIGHT CARDS */}
                <m.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.1, delayChildren: 0.12 },
                        },
                    }}
                    className="relative grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                    {highlights.map((item, index) => {
                        const Icon = item.icon
                        const isOrange = item.accent === 'orange'

                        return (
                            <m.article
                                key={item.label}
                                variants={reveal}
                                whileHover={shouldReduceMotion ? {} : { y: -7, scale: 1.015 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                className={`group relative min-h-[190px] overflow-hidden rounded-3xl border p-6 transition-colors duration-300 sm:p-7 ${
                                    isDark
                                        ? 'border-white/[0.09] bg-[#1d1728]/80 hover:border-violet-400/35 hover:bg-[#211a30]'
                                        : 'border-[#f0dfd2] bg-white/90 hover:border-violet-300 hover:bg-white'
                                }`}
                            >
                                <div
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                                        isOrange ? 'bg-orange-400/10' : 'bg-violet-500/10'
                                    }`}
                                />

                                <div className="relative flex items-start justify-between">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                        isOrange
                                            ? 'bg-orange-400/10 text-orange-500'
                                            : 'bg-violet-500/10 text-violet-500'
                                    }`}>
                                        <Icon size={19} strokeWidth={1.8} />
                                    </div>

                                    <span className={`text-[10px] font-medium tracking-[0.18em] ${
                                        isDark ? 'text-white/25' : 'text-[#a397a6]'
                                    }`}>
                                        0{index + 1}
                                    </span>
                                </div>

                                <h3 className={`relative mt-6 text-2xl font-bold tracking-tight sm:text-3xl ${
                                    isOrange ? 'text-orange-500' : 'text-violet-500'
                                }`}>
                                    {item.value}
                                </h3>

                                <p className={`relative mt-2 text-sm font-semibold ${
                                    isDark ? 'text-white/85' : 'text-[#292033]'
                                }`}>
                                    {item.label}
                                </p>

                                <p className={`relative mt-1 text-xs leading-5 ${
                                    isDark ? 'text-white/40' : 'text-[#827687]'
                                }`}>
                                    {item.detail}
                                </p>

                                <div className={`relative mt-5 h-px w-9 rounded-full transition-all duration-500 group-hover:w-16 ${
                                    isOrange ? 'bg-orange-400' : 'bg-violet-500'
                                }`} />
                            </m.article>
                        )
                    })}
                </m.div>
            </div>
        </section>
    )
}

export default AboutPreview

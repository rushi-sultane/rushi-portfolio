import { m, useReducedMotion } from 'framer-motion'
import {
    ArrowUpRight,
    ExternalLink,
    Globe2,
    Layers3,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

const featuredProjects = [
    {
        number: '01',
        title: 'RecruitmentHub365',
        category: 'Recruitment Platform',
        description:
            'A recruitment platform website with responsive interfaces and user-focused sections for job seekers and employers.',
        technologies: ['React JS', 'JavaScript', 'Tailwind CSS'],
        href: 'https://recruitment-hub365-website.vercel.app/',
        live: '',
        visual: 'from-violet-600/35 via-purple-500/15 to-orange-400/10',
        initials: 'RH',
        accent: 'violet',
    },
    {
        number: '02',
        title: 'DwellAlgo',
        category: 'Company Website',
        description:
            'A modern company website built with reusable React components, responsive layouts and smooth animations.',
        technologies: ['React JS', 'Tailwind CSS', 'Framer Motion'],
        href: 'https://dwellalgo.com',
        live: '',
        visual: 'from-blue-600/30 via-violet-500/15 to-orange-400/10',
        initials: 'DA',
        accent: 'orange',
    },
    {
        number: '03',
        title: 'Hospital Management System',
        category: 'Full Stack Application',
        description:
            'A Django-based application to manage doctors, patients and appointments with CRUD functionality.',
        technologies: ['Python', 'Django', 'SQLite'],
        github: '',
        live: '',
        visual: 'from-emerald-600/25 via-teal-500/15 to-violet-500/10',
        initials: 'HMS',
        accent: 'violet',
    },
]

function FeaturedProjects() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const shouldReduceMotion = useReducedMotion()

    return (
        <section
            id="projects"
            className={`projects-section snap-section relative isolate w-full overflow-hidden px-6 py-24 transition-colors duration-500 md:px-14 lg:py-32 ${
                isDark ? 'bg-[#171322] text-white' : 'bg-[#fffaf6] text-[#292033]'
            }`}
        >
            {/* Ambient orange and violet light */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-36 top-16 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-[110px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-orange-400/[0.07] blur-[110px]"
            />

            <div className="section-container relative z-10 w-full">
                {/* SECTION HEADING */}
                <m.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65 }}
                    className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
                >
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-8 bg-gradient-to-r from-violet-500 to-orange-400" />
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500 sm:text-sm">
                                04 / Selected Work
                            </p>
                        </div>

                        <h2 className={`text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl ${
                            isDark ? 'text-white' : 'text-[#292033]'
                        }`}>
                            Featured <span className="gradient-text">Projects.</span>
                        </h2>

                        <p className={`mt-6 max-w-xl text-sm leading-8 md:text-base ${
                            isDark ? 'text-white/55' : 'text-[#62566b]'
                        }`}>
                            A selection of projects where I turn ideas into
                            functional, responsive and engaging digital experiences.
                        </p>
                    </div>

                    <div className={`inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-xs sm:self-auto ${
                        isDark
                            ? 'border-white/10 bg-white/[0.035] text-white/55'
                            : 'border-[#f0dfd2] bg-white/75 text-[#756a7c]'
                    }`}>
                        <Layers3 size={14} className="text-violet-500" />
                        03 Featured Projects
                    </div>
                </m.div>

                {/* PROJECT CARDS */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {featuredProjects.map((project, index) => {
                        const websiteUrl = project.live || project.href
                        const isOrange = project.accent === 'orange'

                        return (
                            <m.article
                                key={project.number}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.15 }}
                                transition={{
                                    duration: 0.65,
                                    delay: index * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={shouldReduceMotion ? {} : { y: -8 }}
                                className={`group flex flex-col overflow-hidden rounded-3xl border transition-colors duration-300 ${
                                    isDark
                                        ? 'border-white/[0.09] bg-[#1d1728]/80 hover:border-violet-400/35'
                                        : 'border-[#f0dfd2] bg-white/90 shadow-[0_14px_45px_rgba(70,40,20,0.04)] hover:border-violet-300'
                                }`}
                            >
                                {/* PROJECT VISUAL */}
                                <div className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${project.visual}`}>
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 opacity-[0.12]"
                                        style={{
                                            backgroundImage:
                                                'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
                                            backgroundSize: '32px 32px',
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/[0.04]" />

                                    {/* Floating preview panel */}
                                    <m.div
                                        animate={shouldReduceMotion ? {} : { y: [0, -7, 0] }}
                                        transition={{
                                            duration: 5 + index,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="relative flex h-32 w-[72%] items-center justify-center rounded-2xl border border-white/25 bg-white/[0.12] shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:scale-105 sm:h-36"
                                    >
                                        <span className="font-display text-6xl font-bold tracking-tighter text-white/85 sm:text-7xl">
                                            {project.initials}
                                        </span>
                                        <span className="absolute bottom-3 left-4 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-white/60">
                                            <span className={`h-1.5 w-1.5 rounded-full ${isOrange ? 'bg-orange-300' : 'bg-violet-300'}`} />
                                            Project preview
                                        </span>
                                    </m.div>

                                    <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] text-white/85 backdrop-blur-md">
                                        {project.number}
                                    </span>

                                    <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/80 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-white/20">
                                        <ArrowUpRight size={17} />
                                    </span>
                                </div>

                                {/* PROJECT DETAILS */}
                                <div className="flex flex-1 flex-col p-6 sm:p-7">
                                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-500">
                                        {project.category}
                                    </p>

                                    <h3 className={`text-xl font-semibold leading-snug tracking-tight ${
                                        isDark ? 'text-white' : 'text-[#292033]'
                                    }`}>
                                        {project.title}
                                    </h3>

                                    <p className={`mt-4 flex-1 text-sm leading-7 ${
                                        isDark ? 'text-white/50' : 'text-[#756a7c]'
                                    }`}>
                                        {project.description}
                                    </p>

                                    {/* TECHNOLOGY TAGS */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.technologies.map((technology) => (
                                            <span
                                                key={technology}
                                                className={`rounded-lg border px-3 py-2 text-[11px] transition-colors duration-300 ${
                                                    isDark
                                                        ? 'border-white/10 bg-white/[0.035] text-white/65 hover:border-violet-400/40 hover:text-violet-300'
                                                        : 'border-[#eee3dc] bg-[#fffaf6] text-[#62566b] hover:border-violet-300 hover:text-violet-700'
                                                }`}
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>

                                    {/* PROJECT LINKS */}
                                    {(project.github || websiteUrl) && (
                                        <div className={`mt-7 flex flex-wrap items-center gap-5 border-t pt-5 ${
                                            isDark ? 'border-white/[0.08]' : 'border-[#eee3dc]'
                                        }`}>
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-violet-500 ${
                                                        isDark ? 'text-white/65' : 'text-[#62566b]'
                                                    }`}
                                                >
                                                    <FaGithub size={15} />
                                                    Source Code
                                                </a>
                                            )}

                                            {websiteUrl && (
                                                <a
                                                    href={websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-xs font-semibold text-violet-500 transition-colors hover:text-orange-500"
                                                >
                                                    <Globe2 size={15} />
                                                    Visit Website
                                                    <ExternalLink size={13} />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </m.article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FeaturedProjects

import { motion, useReducedMotion } from 'framer-motion'
import {
    Braces,
    Code2,
    Database,
    GitBranch,
    Globe2,
    Layers3,
    Server,
    Wrench,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const skillGroups = [
    {
        number: '01',
        title: 'Frontend Development',
        description: 'Building responsive, accessible and interactive user interfaces.',
        icon: Code2,
        accent: 'violet',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'React JS', 'Tailwind CSS'],
    },
    {
        number: '02',
        title: 'Backend Development',
        description: 'Developing server-side applications, data models and REST APIs.',
        icon: Server,
        accent: 'orange',
        skills: ['Python', 'Django', 'Django REST Framework', 'REST API', 'SQLite'],
    },
    {
        number: '03',
        title: 'Tools & Technologies',
        description: 'Tools I use to build, version, manage and deploy projects.',
        icon: Wrench,
        accent: 'violet',
        skills: ['Git', 'GitHub', 'Vite', 'VS Code', 'Vercel', 'Netlify'],
    },
]

const marqueeSkills = [
    'HTML5',
    'CSS3',
    'JavaScript',
    'React JS',
    'Tailwind CSS',
    'Python',
    'Django',
    'Django REST Framework',
    'REST API',
    'SQLite',
    'Git',
    'GitHub',
    'Vite',
    'Framer Motion',
    'Vercel',
    'Netlify',
]

function TechStack() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const shouldReduceMotion = useReducedMotion()

    return (
        <section
            id="skills"
            className={`skills-section snap-section relative isolate w-full overflow-hidden px-6 py-24 transition-colors duration-500 md:px-14 lg:py-32 ${
                isDark ? 'bg-[#100d18] text-white' : 'bg-[#fff8f2] text-[#292033]'
            }`}
        >
            {/* Ambient background accents */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-[110px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-orange-400/[0.07] blur-[110px]"
            />

            <div className="section-container relative z-10">
                {/* SECTION HEADING */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65 }}
                    className="mb-12 max-w-2xl"
                >
                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-px w-8 bg-gradient-to-r from-violet-500 to-orange-400" />
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500 sm:text-sm">
                            03 / My Skills
                        </p>
                    </div>

                    <h2 className={`text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl ${
                        isDark ? 'text-white' : 'text-[#292033]'
                    }`}>
                        Technologies I use to
                        <span className="gradient-text"> build.</span>
                    </h2>

                    <p className={`mt-6 max-w-xl text-sm leading-8 md:text-base ${
                        isDark ? 'text-white/55' : 'text-[#62566b]'
                    }`}>
                        A practical toolkit for creating modern frontend
                        experiences, backend applications and reliable
                        development workflows.
                    </p>
                </motion.div>

                {/* INFINITE TECH MARQUEE */}
                <div
                    className={`tech-marquee mb-14 overflow-hidden rounded-2xl border py-4 ${
                        isDark
                            ? 'border-white/[0.08] bg-white/[0.025]'
                            : 'border-[#f0dfd2] bg-white/70'
                    }`}
                    aria-label="Technology stack"
                >
                    <div className="marquee-track">
                        {[0, 1].map((group) => (
                            <div
                                key={group}
                                className="marquee-group"
                                aria-hidden={group === 1}
                            >
                                {marqueeSkills.map((skill) => (
                                    <span
                                        key={`${group}-${skill}`}
                                        className={`marquee-item transition-colors duration-300 ${
                                            isDark
                                                ? 'border-white/10 bg-white/[0.035] text-white/65'
                                                : 'border-[#eadfd8] bg-white text-[#62566b]'
                                        }`}
                                    >
                                        <span className="marquee-dot" />
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* SKILL GROUP CARDS */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.12 },
                        },
                    }}
                    className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
                >
                    {skillGroups.map((group, index) => {
                        const Icon = group.icon
                        const isOrange = group.accent === 'orange'

                        return (
                            <motion.article
                                key={group.number}
                                variants={{
                                    hidden: { opacity: 0, y: 28 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.65,
                                            ease: [0.22, 1, 0.36, 1],
                                        },
                                    },
                                }}
                                whileHover={shouldReduceMotion ? {} : { y: -8 }}
                                className={`group relative flex min-h-[350px] flex-col overflow-hidden rounded-3xl border p-6 transition-colors duration-300 sm:p-7 ${
                                    isDark
                                        ? 'border-white/[0.09] bg-[#1d1728]/75 hover:border-violet-400/35 hover:bg-[#211a30]'
                                        : 'border-[#f0dfd2] bg-white/85 shadow-[0_12px_40px_rgba(70,40,20,0.035)] hover:border-violet-300 hover:bg-white'
                                }`}
                            >
                                {/* Card glow */}
                                <div
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                                        isOrange ? 'bg-orange-400/10' : 'bg-violet-500/10'
                                    }`}
                                />

                                <div className="relative flex items-start justify-between">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                                        isOrange
                                            ? 'bg-orange-400/10 text-orange-500'
                                            : 'bg-violet-500/10 text-violet-500'
                                    }`}>
                                        <Icon size={22} strokeWidth={1.7} />
                                    </div>

                                    <span className={`text-xs font-semibold tracking-[0.2em] ${
                                        isDark ? 'text-white/25' : 'text-[#a397a6]'
                                    }`}>
                                        {group.number}
                                    </span>
                                </div>

                                <h3 className={`relative mt-7 text-xl font-semibold tracking-tight ${
                                    isDark ? 'text-white' : 'text-[#292033]'
                                }`}>
                                    {group.title}
                                </h3>

                                <p className={`relative mt-3 min-h-[48px] text-sm leading-6 ${
                                    isDark ? 'text-white/45' : 'text-[#756a7c]'
                                }`}>
                                    {group.description}
                                </p>

                                <div className={`relative my-6 h-px w-full ${
                                    isDark ? 'bg-white/[0.08]' : 'bg-[#eee3dc]'
                                }`}>
                                    <div className={`h-px w-12 transition-all duration-500 group-hover:w-24 ${
                                        isOrange ? 'bg-orange-400' : 'bg-violet-500'
                                    }`} />
                                </div>

                                <div className="relative mt-auto flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`rounded-lg border px-3 py-2 text-xs transition-all duration-300 ${
                                                isDark
                                                    ? 'border-white/10 bg-white/[0.035] text-white/65 hover:border-violet-400/40 hover:text-violet-300'
                                                    : 'border-[#eee3dc] bg-[#fffaf6] text-[#62566b] hover:border-violet-300 hover:text-violet-700'
                                            }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.article>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}

export default TechStack

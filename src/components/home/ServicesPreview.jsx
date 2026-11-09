
import { m } from 'framer-motion'
import {
    Code2,
    Database,
    Layout,
    Smartphone,
    ArrowUpRight,
} from 'lucide-react'

const services = [
    {
        number: '01',
        title: 'Frontend Development',
        shortTitle: 'Frontend',
        description:
            'Responsive and interactive websites using React, JavaScript and modern CSS.',
        icon: Layout,
        tags: ['React', 'Tailwind', 'JavaScript'],
        gradient: 'from-violet-500/20 via-purple-500/5 to-transparent',
        accent: 'text-violet-300',
    },
    {
        number: '02',
        title: 'Backend Development',
        shortTitle: 'Backend',
        description:
            'Application logic, database integration and REST API development.',
        icon: Database,
        tags: ['Python', 'Django', 'REST API'],
        gradient: 'from-blue-500/20 via-indigo-500/5 to-transparent',
        accent: 'text-blue-300',
    },
    {
        number: '03',
        title: 'Web Application Development',
        shortTitle: 'Full Stack',
        description:
            'End-to-end web applications connecting modern frontend experiences with reliable backend systems.',
        icon: Code2,
        tags: ['React', 'Python', 'SQLite'],
        gradient: 'from-fuchsia-500/20 via-violet-500/5 to-transparent',
        accent: 'text-fuchsia-300',
    },
    {
        number: '04',
        title: 'Responsive UI Development',
        shortTitle: 'UI / UX',
        description:
            'Clean, accessible and mobile-friendly interfaces with polished layouts and interactions.',
        icon: Smartphone,
        tags: ['Responsive UI', 'CSS', 'Animations'],
        gradient: 'from-cyan-500/20 via-blue-500/5 to-transparent',
        accent: 'text-cyan-300',
    },
]

function ServicesPreview() {
    return (
        <section className="services-section snap-section relative flex w-full flex-col justify-center overflow-hidden bg-[#0d0b12] px-6 text-white md:px-14">

            {/* Background effects */}
            <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[130px]" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-600/10 blur-[130px]" />

            <div className="services-container relative mx-auto w-full max-w-7xl">

                {/* Heading */}
                <m.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="services-heading mb-8 flex items-end justify-between gap-5"
                >
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-violet-400">
                            05 / What I Do
                        </p>

                        <h2 className="font-display text-4xl font-bold md:text-6xl">
                            My areas of
                            <br />
                            <span className="gradient-text">expertise.</span>
                        </h2>
                    </div>

                    <p className="hidden max-w-xs pb-2 text-sm leading-6 text-white/40 md:block">
                        Turning ideas into functional, engaging and meaningful digital experiences.
                    </p>
                </m.div>

                {/* Creative service cards */}
                <div className="services-grid grid grid-cols-2 gap-4">

                    {services.map((service, index) => {
                        const Icon = service.icon

                        return (
                            <m.article
                                key={service.number}
                                initial={{ opacity: 0, y: 35 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.1,
                                }}
                                whileHover={{
                                    y: -6,
                                    transition: { duration: 0.25 },
                                }}
                                className="service-card group relative isolate overflow-hidden rounded-3xl border border-white/[0.09] bg-[#13111a] p-6 transition-colors duration-300 hover:border-violet-400/40"
                            >
                                {/* Gradient background */}
                                <div
                                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${service.gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                                />

                                {/* Hover glow */}
                                <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-40 w-40 rounded-full bg-violet-500/10 blur-[65px] transition-all duration-500 group-hover:scale-150 group-hover:bg-violet-500/20" />

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium tracking-[0.25em] text-white/30">
                                        / {service.number}
                                    </span>

                                    <div className="service-icon flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:scale-110 group-hover:border-violet-400/30 group-hover:bg-violet-500/10">
                                        <Icon
                                            size={23}
                                            strokeWidth={1.5}
                                            className={`${service.accent} transition-transform duration-300 group-hover:rotate-6`}
                                        />
                                    </div>
                                </div>

                                <div className="service-card-content mt-5">
                                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">
                                        {service.shortTitle}
                                    </div>

                                    <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="service-tags mt-5 flex flex-wrap gap-2">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5 text-[10px] text-white/55 transition-colors duration-300 group-hover:border-violet-400/20 group-hover:text-white/75"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Decorative arrow */}
                                <div className="pointer-events-none absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-violet-400/40 group-hover:text-violet-300">
                                    <ArrowUpRight size={17} />
                                </div>
                            </m.article>
                        )
                    })}

                </div>

                {/* Footer */}
                <div className="services-footer mt-6 flex items-center justify-between">
                    <p className="text-xs tracking-wide text-white/30">
                        Design <span className="text-violet-400">·</span> Develop <span className="text-violet-400">·</span> Deliver
                    </p>

                    <span className="text-xs tracking-widest text-white/25">
                        05 — 08
                    </span>
                </div>

            </div>
        </section>
    )
}

export default ServicesPreview


import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const experiences = [
    {
        period: 'Current',
        role: 'Frontend Developer Intern',
        company: 'DwellAlgo',
        description:
            'Working on modern responsive web interfaces, reusable React components, animations and user experiences.',
        skills: ['React JS', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
        status: 'Ongoing',
    },
    {
        period: '2022 – 2025',
        role: 'Bachelor of Engineering',
        company: 'Computer Engineering',
        description:
            'Developed a foundation in programming, software development, databases and computer engineering.',
        skills: ['Python', 'Programming', 'Database', 'Web Development'],
        status: 'Completed',
    },
]

function ExperiencePreview() {
    return (
        <section className="experience-section snap-section relative flex w-full flex-col justify-center overflow-hidden bg-[#08080b] px-6 text-white md:px-14">

            {/* Background glow */}
            <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-violet-600/10 blur-[130px]" />

            <div className="experience-container relative mx-auto w-full max-w-7xl">

                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="experience-heading"
                >
                    <p className="mb-3 text-xs uppercase tracking-[0.4em] text-violet-400">
                        04 / My Journey
                    </p>

                    <h2 className="font-display text-4xl font-bold md:text-6xl">
                        Experience &
                        <br />
                        <span className="gradient-text">education.</span>
                    </h2>
                </motion.div>

                {/* Experience timeline */}
                <div className="experience-list relative mt-9 grid grid-cols-2 gap-5">

                    {/* Timeline line */}
                    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-violet-400/70 via-violet-500/20 to-transparent" />

                    {experiences.map((item, index) => (
                        <motion.article
                            key={item.role}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                            }}
                            className="experience-card relative rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.045]"
                        >
                            {/* Timeline dot */}
                            <span className="absolute -top-[5px] left-7 h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.8)]" />

                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-violet-300">
                                    {item.period}
                                </span>

                                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50">
                                    {item.status}
                                </span>
                            </div>

                            <h3 className="mt-5 font-display text-xl font-bold md:text-2xl">
                                {item.role}
                            </h3>

                            <p className="mt-2 text-sm text-violet-300">
                                {item.company}
                            </p>

                            <p className="mt-4 text-sm leading-6 text-white/45">
                                {item.description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {item.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/55"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Explore link */}
                <div className="experience-footer mt-7 flex items-center justify-between">
                    <Link
                        to="/experience"
                        className="group inline-flex items-center gap-2 text-sm text-violet-300 transition-colors hover:text-white"
                    >
                        Explore my journey
                        <ArrowUpRight
                            size={17}
                            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                    </Link>

                    <span className="text-xs tracking-widest text-white/25">
                        04 — 08
                    </span>
                </div>
            </div>
        </section>
    )
}

export default ExperiencePreview

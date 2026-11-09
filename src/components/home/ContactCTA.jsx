import { useState } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import {
    ArrowUpRight,
    Check,
    Copy,
    Mail,
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

const email = 'sultanerushi@gmail.com'

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/rushi-sultane',
        icon: FaGithub,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/rushikesh-sultane/',
        icon: FaLinkedin,
    },
]

function ContactCTA() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const shouldReduceMotion = useReducedMotion()
    const [copied, setCopied] = useState(false)

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1800)
        } catch {
            window.location.href = `mailto:${email}`
        }
    }

    return (
        <section
            id="contact"
            className={`contact-cta-section snap-section relative isolate flex w-full items-center justify-center overflow-hidden px-6 py-24 transition-colors duration-500 md:px-14 lg:py-32 ${
                isDark ? 'bg-[#100d18] text-white' : 'bg-[#fff8f2] text-[#292033]'
            }`}
        >
            {/* AMBIENT BACKGROUND */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.12] blur-[120px]" />
                <div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-orange-400/[0.08] blur-[110px]" />
                <div
                    className={`absolute inset-0 ${
                        isDark ? 'opacity-[0.035]' : 'opacity-[0.045]'
                    }`}
                    style={{
                        backgroundImage: isDark
                            ? 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)'
                            : 'linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(90deg, #6d28d9 1px, transparent 1px)',
                        backgroundSize: '65px 65px',
                    }}
                />
            </div>

            <div className="section-container relative z-10 w-full text-center">
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="mb-7 flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-500" />
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500 sm:text-sm">
                            05 / Get In Touch
                        </p>
                        <span className="h-px w-8 bg-gradient-to-l from-transparent to-orange-400" />
                    </div>

                    <h2 className={`mx-auto max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl ${
                        isDark ? 'text-white' : 'text-[#292033]'
                    }`}>
                        Have an idea?
                        <br />
                        Let's build something
                        <span className="gradient-text"> meaningful.</span>
                    </h2>

                    <p className={`mx-auto mt-7 max-w-xl text-sm leading-8 md:text-base ${
                        isDark ? 'text-white/55' : 'text-[#62566b]'
                    }`}>
                        I'm open to exciting opportunities, collaborations
                        and conversations. Let's connect and create
                        something impactful together.
                    </p>

                    {/* PRIMARY EMAIL ACTION */}
                    <m.a
                        whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        href={`mailto:${email}`}
                        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-violet-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-orange-500"
                    >
                        <Mail size={17} />
                        Let's Talk
                        <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </m.a>

                    {/* EMAIL + COPY ACTION */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <span className={`text-sm ${
                            isDark ? 'text-white/50' : 'text-[#756a7c]'
                        }`}>
                            {email}
                        </span>

                        <button
                            type="button"
                            onClick={copyEmail}
                            aria-label={copied ? 'Email copied' : 'Copy email address'}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                                isDark
                                    ? 'border-white/10 text-white/60 hover:border-violet-400/40 hover:text-violet-300'
                                    : 'border-[#eadfd8] text-[#756a7c] hover:border-violet-300 hover:text-violet-700'
                            }`}
                        >
                            {copied ? <Check size={13} /> : <Copy size={13} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div className={`mx-auto mt-12 flex max-w-sm items-center justify-center gap-4 border-t pt-8 ${
                        isDark ? 'border-white/10' : 'border-[#eadfd8]'
                    }`}>
                        <span className={`mr-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                            isDark ? 'text-white/30' : 'text-[#9a8e9e]'
                        }`}>
                            Find me on
                        </span>

                        {socialLinks.map((social) => {
                            const Icon = social.icon

                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit my ${social.label} profile`}
                                    className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:text-violet-500 ${
                                        isDark
                                            ? 'border-white/10 bg-white/[0.025] text-white/65'
                                            : 'border-[#eadfd8] bg-white/70 text-[#62566b]'
                                    }`}
                                >
                                    <Icon size={15} />
                                    {social.label}
                                </a>
                            )
                        })}
                    </div>
                </m.div>
            </div>
        </section>
    )
}

export default ContactCTA

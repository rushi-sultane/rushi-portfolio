import { motion, useReducedMotion } from 'framer-motion'
import {
    ArrowUpRight,
    Mail,
    MoveUp,
} from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

const email = 'sultanerushi@gmail.com'

const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
]

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/rushi-sultane',
        icon: FaGithub,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/rushikesh-sultane/',
        icon: FaLinkedin,
    },
]

function Footer() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const shouldReduceMotion = useReducedMotion()

    const handleNavigation = (href) => {
        if (href === '#home') {
            window.scrollTo({
                top: 0,
                behavior: shouldReduceMotion ? 'auto' : 'smooth',
            })
            return
        }

        document.querySelector(href)?.scrollIntoView({
            behavior: shouldReduceMotion ? 'auto' : 'smooth',
            block: 'start',
        })
    }

    return (
        <footer
            className={`relative isolate overflow-hidden border-t px-6 pb-7 pt-16 transition-colors duration-500 md:px-14 ${
                isDark
                    ? 'border-white/[0.08] bg-[#100d18] text-white'
                    : 'border-[#f0dfd2] bg-[#fff8f2] text-[#292033]'
            }`}
        >
            {/* AMBIENT ACCENTS */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-violet-600/[0.09] blur-[110px]" />
                <div className="absolute -bottom-40 left-1/4 h-72 w-72 rounded-full bg-orange-400/[0.06] blur-[100px]" />
            </div>

            <div className="section-container relative z-10">
                {/* FOOTER MAIN */}
                <div className="grid gap-12 border-b pb-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr] lg:gap-16"
                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#eadfd8' }}
                >
                    {/* BRAND */}
                    <div>
                        <button
                            type="button"
                            onClick={() => handleNavigation('#home')}
                            className={`text-left text-3xl font-bold tracking-tighter transition-colors hover:text-violet-500 ${
                                isDark ? 'text-white' : 'text-[#292033]'
                            }`}
                            aria-label="Back to homepage"
                        >
                            RS<span className="text-violet-500">.</span>
                        </button>

                        <p className={`mt-5 max-w-sm text-sm leading-7 ${
                            isDark ? 'text-white/45' : 'text-[#756a7c]'
                        }`}>
                            Building thoughtful digital experiences with
                            creativity, clean code and modern technologies.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-3 py-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                                <span className="relative h-2 w-2 rounded-full bg-green-400" />
                            </span>
                            <span className={`text-[10px] font-medium tracking-wide ${
                                isDark ? 'text-white/60' : 'text-[#62566b]'
                            }`}>
                                Open to opportunities
                            </span>
                        </div>

                        <p className="mt-5 text-xs font-medium tracking-wide text-violet-500">
                            Frontend Developer · React · Python
                        </p>
                    </div>

                    {/* NAVIGATION */}
                    <div>
                        <h3 className={`mb-6 text-xs font-semibold uppercase tracking-[0.22em] ${
                            isDark ? 'text-white/80' : 'text-[#292033]'
                        }`}>
                            Explore
                        </h3>

                        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-5 gap-y-4">
                            {footerLinks.map((link) => (
                                <button
                                    key={link.name}
                                    type="button"
                                    onClick={() => handleNavigation(link.href)}
                                    className={`group flex w-fit items-center gap-1.5 text-left text-sm transition-colors duration-300 hover:text-violet-500 ${
                                        isDark ? 'text-white/45' : 'text-[#756a7c]'
                                    }`}
                                >
                                    {link.name}
                                    <ArrowUpRight
                                        size={12}
                                        className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                                    />
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* CONNECT */}
                    <div>
                        <h3 className={`mb-6 text-xs font-semibold uppercase tracking-[0.22em] ${
                            isDark ? 'text-white/80' : 'text-[#292033]'
                        }`}>
                            Let's Connect
                        </h3>

                        <p className={`mb-5 max-w-xs text-sm leading-7 ${
                            isDark ? 'text-white/45' : 'text-[#756a7c]'
                        }`}>
                            Have an opportunity or want to collaborate?
                            I'd love to hear from you.
                        </p>

                        <a
                            href={`mailto:${email}`}
                            className="group inline-flex items-center gap-2 text-sm font-medium text-violet-500 transition-colors hover:text-orange-500"
                        >
                            <Mail size={16} />
                            {email}
                            <ArrowUpRight
                                size={14}
                                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon

                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit ${social.name}`}
                                        className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:text-violet-500 ${
                                            isDark
                                                ? 'border-white/10 bg-white/[0.025] text-white/55'
                                                : 'border-[#eadfd8] bg-white/70 text-[#756a7c]'
                                        }`}
                                    >
                                        <Icon size={15} />
                                        {social.name}
                                        <ArrowUpRight size={11} />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* FOOTER BOTTOM */}
                <div className="flex flex-col items-center justify-between gap-5 pt-6 sm:flex-row">
                    <p className={`text-center text-xs leading-6 ${
                        isDark ? 'text-white/30' : 'text-[#948899]'
                    }`}>
                        © {new Date().getFullYear()} Rushikesh Sultane.
                        {' '}Designed & built with care.
                    </p>

                    <motion.button
                        type="button"
                        onClick={() => handleNavigation('#home')}
                        whileHover={shouldReduceMotion ? {} : { y: -3 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs transition-colors duration-300 hover:border-violet-500/40 hover:text-violet-500 ${
                            isDark
                                ? 'border-white/10 text-white/50'
                                : 'border-[#eadfd8] text-[#756a7c]'
                        }`}
                    >
                        Back to top
                        <MoveUp
                            size={13}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5"
                        />
                    </motion.button>
                </div>
            </div>
        </footer>
    )
}

export default Footer

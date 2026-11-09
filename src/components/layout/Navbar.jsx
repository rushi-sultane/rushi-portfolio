import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
]

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [resumeOpen, setResumeOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')

    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24)

            const sectionIds = navLinks.map((link) => link.href.slice(1))
            const current = sectionIds
                .map((id) => document.getElementById(id))
                .filter(Boolean)
                .filter((section) => section.getBoundingClientRect().top <= 150)
                .at(-1)

            if (current) setActiveSection(current.id)
            else setActiveSection('home')
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])
    const isDark = theme === 'dark'

    const handleNavigation = (href) => {
        setMenuOpen(false)
        setActiveSection(href.slice(1))

        if (href === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }

        document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const navText = isDark
        ? 'text-gray-400 hover:text-white'
        : 'text-gray-600 hover:text-violet-700'

    const controlStyle = isDark
        ? 'border-white/10 text-white hover:bg-white/5'
        : 'border-gray-300 text-gray-800 hover:bg-violet-50'

    const dropdownStyle = isDark
        ? 'border-white/10 bg-[#1d1728] text-gray-200'
        : 'border-gray-200 bg-white text-gray-700'

    return (
        <header
            className={`fixed left-0 top-0 z-50 w-full px-6 transition-all duration-500 md:px-14 ${
                isScrolled
                    ? isDark
                        ? 'border-b border-white/10 bg-[#100d18]/80 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-2xl'
                        : 'border-b border-[#f0dfd2]/80 bg-[#fff8f2]/85 shadow-[0_8px_30px_rgba(70,40,20,0.06)] backdrop-blur-2xl'
                    : 'border-b border-transparent bg-transparent'
            }`}
        >
            <nav className="section-container relative flex h-[76px] items-center justify-between">
                {isScrolled && (
                    <span className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/60 to-orange-400/60" />
                )}

                {/* BRAND */}
                <Link
                    to="/"
                    onClick={() => {
                        setMenuOpen(false)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`text-2xl font-bold tracking-tighter transition-colors ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}
                >
                    RS<span className="text-violet-500">.</span>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavigation(link.href)}
                            aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                            className={`group relative py-2 text-sm transition-colors duration-300 ${
                                activeSection === link.href.slice(1)
                                    ? isDark ? 'text-white' : 'text-violet-700'
                                    : navText
                            }`}
                        >
                            {link.name}

                            <motion.span
                                className="absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-orange-400"
                                initial={false}
                                animate={{
                                    width: activeSection === link.href.slice(1) ? '100%' : '0%',
                                    opacity: activeSection === link.href.slice(1) ? 1 : 0,
                                }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                            />
                        </button>
                    ))}
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-3">

                    {/* THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        className={`theme-toggle rounded-full border px-3 py-2 text-sm transition-all duration-300 hover:border-orange-500 hover:text-orange-500 ${controlStyle}`}
                    >
                        <span className="mr-1">
                            {isDark ? '☀' : '☾'}
                        </span>
                        <span className="hidden sm:inline">
                            {isDark ? 'Light' : 'Dark'}
                        </span>
                    </button>

                    {/* DESKTOP RESUME DROPDOWN */}
                    <div className="relative hidden md:block">
                        <button
                            onClick={() => setResumeOpen(!resumeOpen)}
                            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-orange-500"
                            aria-expanded={resumeOpen}
                            aria-haspopup="true"
                        >
                            Resume
                            <span className="text-xs">
                                {resumeOpen ? '↑' : '↓'}
                            </span>
                        </button>

                        <AnimatePresence>
                            {resumeOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute right-0 top-full mt-3 w-48 overflow-hidden rounded-xl border p-2 shadow-xl ${dropdownStyle}`}
                                >
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setResumeOpen(false)}
                                        className="block rounded-lg px-4 py-3 text-sm transition hover:bg-violet-500/10 hover:text-violet-500"
                                    >
                                        View Resume ↗
                                    </a>

                                    <a
                                        href="/resume.pdf"
                                        download="Rushikesh-Sultane-Resume.pdf"
                                        onClick={() => setResumeOpen(false)}
                                        className="block rounded-lg px-4 py-3 text-sm transition hover:bg-violet-500/10 hover:text-violet-500"
                                    >
                                        Download Resume ↓
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border transition md:hidden ${controlStyle}`}
                        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                    >
                        <span className="text-xl">
                            {menuOpen ? '×' : '☰'}
                        </span>
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`overflow-hidden border-t transition-colors duration-300 md:hidden ${
                            isDark
                                ? 'border-white/10 bg-[#100d18]'
                                : 'border-gray-200 bg-[#fff8f2]'
                        }`}
                    >
                        <div className="flex flex-col gap-1 px-6 py-5">

                            {/* MOBILE NAVIGATION LINKS */}
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleNavigation(link.href)}
                                    className={`rounded-lg px-4 py-3 text-left text-sm transition ${
                                        activeSection === link.href.slice(1)
                                            ? isDark
                                                ? 'bg-violet-500/15 text-violet-300'
                                                : 'bg-violet-500/10 text-violet-700'
                                            : isDark
                                                ? 'text-gray-300 hover:bg-violet-500/10 hover:text-violet-400'
                                                : 'text-gray-700 hover:bg-violet-500/10 hover:text-violet-600'
                                    }`}
                                >
                                    {link.name}
                                </motion.button>
                            ))}

                            {/* MOBILE RESUME OPTIONS */}
                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-full border border-violet-500/40 px-3 py-3 text-center text-sm font-medium text-violet-500 transition hover:bg-violet-500 hover:text-white"
                                >
                                    View Resume ↗
                                </a>

                                <a
                                    href="/resume.pdf"
                                    download="Rushikesh-Sultane-Resume.pdf"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-full bg-violet-600 px-3 py-3 text-center text-sm font-medium text-white transition hover:bg-orange-500"
                                >
                                    Download ↓
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navbar
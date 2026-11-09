import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

function Preloader() {
    const [complete, setComplete] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const { theme } = useTheme()
    const shouldReduceMotion = useReducedMotion()
    const isDark = theme === 'dark'

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)')
        const updateDevice = () => setIsMobile(mediaQuery.matches)

        updateDevice()
        mediaQuery.addEventListener('change', updateDevice)

        return () => mediaQuery.removeEventListener('change', updateDevice)
    }, [])

    useEffect(() => {
        // Do not cover the page with a preloader on mobile or when reduced
        // motion is preferred. This lets the hero render immediately.
        if (isMobile || shouldReduceMotion) {
            setComplete(true)
            return
        }

        // Keep the desktop intro brief; avoid simulated/random loading progress.
        const timeout = window.setTimeout(() => setComplete(true), 450)
        return () => window.clearTimeout(timeout)
    }, [isMobile, shouldReduceMotion])

    return (
        <AnimatePresence>
            {!complete && (
                <m.div
                    className="fixed inset-0 z-[1000] flex flex-col justify-between p-8 md:p-14"
                    style={{
                        backgroundColor: isDark ? '#100d18' : '#fff8f2',
                        color: isDark ? '#ffffff' : '#292033',
                    }}
                    initial={false}
                    exit={shouldReduceMotion ? { opacity: 0 } : {
                        y: '-100%',
                        transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
                    }}
                >
                    <div className="flex items-center justify-between">
                        <span className="font-display text-xl font-bold">
                            RS<span className="text-[#fb923c]">.</span>
                        </span>
                        <span
                            className="text-xs uppercase tracking-[0.3em]"
                            style={{ color: isDark ? '#b7aec5' : '#62566b' }}
                        >
                            Portfolio 2026
                        </span>
                    </div>

                    <div>
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <h1 className="font-display text-5xl font-bold tracking-tighter md:text-8xl">
                                RUSHI<span className="text-[#a78bfa]">.</span>
                            </h1>
                            <span className="font-display text-3xl font-bold text-[#ea580c] md:text-4xl">
                                100%
                            </span>
                        </div>

                        <div
                            className="h-[2px] w-full overflow-hidden"
                            style={{
                                backgroundColor: isDark
                                    ? 'rgba(255,255,255,0.12)'
                                    : 'rgba(41,32,51,0.12)',
                            }}
                        >
                            <div
                                className="h-full w-full origin-left"
                                style={{
                                    background: 'linear-gradient(90deg, #a78bfa, #fb923c)',
                                }}
                            />
                        </div>

                        <p
                            className="mt-4 text-xs uppercase tracking-[0.25em]"
                            style={{ color: isDark ? '#b7aec5' : '#62566b' }}
                        >
                            Crafting digital experiences
                        </p>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    )
}

export default Preloader

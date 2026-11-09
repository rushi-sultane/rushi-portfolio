
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

function Preloader() {
    const [progress, setProgress] = useState(0)
    const [complete, setComplete] = useState(false)
    const { theme } = useTheme()

    const isDark = theme === 'dark'

    useEffect(() => {
        let value = 0
        let timeout

        const interval = setInterval(() => {
            value += Math.floor(Math.random() * 12) + 5

            if (value >= 100) {
                value = 100
                clearInterval(interval)
                timeout = setTimeout(() => setComplete(true), 500)
            }

            setProgress(value)
        }, 100)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    className="fixed inset-0 z-[1000] flex flex-col justify-between p-8 md:p-14"
                    style={{
                        backgroundColor: isDark ? '#100d18' : '#fff8f2',
                        color: isDark ? '#ffffff' : '#292033',
                    }}
                    exit={{
                        y: '-100%',
                        transition: {
                            duration: 1,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <span className="font-display text-xl font-bold">
                            RS
                            <span className="text-[#fb923c]">.</span>
                        </span>

                        <span
                            className="text-xs uppercase tracking-[0.3em]"
                            style={{
                                color: isDark ? '#b7aec5' : '#62566b',
                            }}
                        >
                            Portfolio 2026
                        </span>
                    </div>

                    {/* Loading Content */}
                    <div>
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <h1 className="font-display text-5xl font-bold tracking-tighter md:text-8xl">
                                RUSHI
                                <span className="text-[#a78bfa]">.</span>
                            </h1>

                            <span className="font-display text-3xl font-bold text-[#ea580c] md:text-4xl">
                                {String(progress).padStart(3, '0')}%
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div
                            className="h-[2px] w-full overflow-hidden"
                            style={{
                                backgroundColor: isDark
                                    ? 'rgba(255,255,255,0.12)'
                                    : 'rgba(41,32,51,0.12)',
                            }}
                        >
                            <motion.div
                                className="h-full"
                                style={{
                                    background:
                                        'linear-gradient(90deg, #a78bfa, #fb923c)',
                                }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.15 }}
                            />
                        </div>

                        <p
                            className="mt-4 text-xs uppercase tracking-[0.25em]"
                            style={{
                                color: isDark ? '#b7aec5' : '#62566b',
                            }}
                        >
                            Crafting digital experiences
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Preloader

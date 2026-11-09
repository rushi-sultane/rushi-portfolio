
import { useEffect, useRef, useState } from 'react'
import {
    motion,
    useReducedMotion,
} from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

function HeroBackground() {
    const canvasRef = useRef(null)
    const [mouse, setMouse] = useState({ x: 0, y: 0 })

    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const shouldReduceMotion = useReducedMotion()

    // PARTICLE NETWORK
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId
        let particles = []
        let width = 0
        let height = 0
        let isVisible = !document.hidden

        const pointer = {
            x: -1000,
            y: -1000,
            active: false,
        }

        const isTouch = window.matchMedia(
            '(pointer: coarse)'
        ).matches

        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        const colors = {
            violet: isDark
                ? '167,139,250'
                : '124,58,237',
            orange: isDark
                ? '251,146,60'
                : '234,88,12',
        }

        // CREATE PARTICLES
        const resize = () => {
            const rect = canvas.getBoundingClientRect()

            width = rect.width
            height = rect.height

            const dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            )

            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            const area = width * height

            const count = Math.min(
                Math.max(Math.floor(area / 10000), 30),
                100
            )

            particles = Array.from({ length: count }, (_, i) => ({
                x: Math.random() * width,
                y: Math.random() * height,

                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,

                radius: Math.random() * 1.7 + 0.7,

                phase: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.025 + 0.008,

                color: i % 4 === 0
                    ? colors.orange
                    : colors.violet,
            }))
        }

        // CURSOR POSITION
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()

            pointer.x = e.clientX - rect.left
            pointer.y = e.clientY - rect.top
            pointer.active = true
        }

        const handleMouseLeave = () => {
            pointer.active = false
            pointer.x = -1000
            pointer.y = -1000
        }

        // DRAW PARTICLES
        const draw = () => {
            if (!isVisible) return

            ctx.clearRect(0, 0, width, height)

            // Cursor glow
            if (pointer.active && !isTouch && !reducedMotion) {
                const glow = ctx.createRadialGradient(
                    pointer.x,
                    pointer.y,
                    0,
                    pointer.x,
                    pointer.y,
                    170
                )

                glow.addColorStop(
                    0,
                    isDark
                        ? 'rgba(167,139,250,0.10)'
                        : 'rgba(124,58,237,0.07)'
                )

                glow.addColorStop(1, 'transparent')

                ctx.fillStyle = glow
                ctx.fillRect(0, 0, width, height)
            }

            // UPDATE PARTICLES
            particles.forEach((particle) => {
                if (!reducedMotion) {
                    particle.phase += particle.pulseSpeed

                    particle.x += particle.vx
                    particle.y += particle.vy

                    // Cursor interaction
                    if (pointer.active && !isTouch) {
                        const dx = particle.x - pointer.x
                        const dy = particle.y - pointer.y

                        const distance = Math.hypot(dx, dy)

                        if (distance < 180 && distance > 0) {
                            const force = (180 - distance) / 180

                            // Gentle repulsion
                            particle.vx +=
                                (dx / distance) * force * 0.035

                            particle.vy +=
                                (dy / distance) * force * 0.035

                            // Circular movement
                            particle.vx +=
                                (-dy / distance) * force * 0.012

                            particle.vy +=
                                (dx / distance) * force * 0.012
                        }
                    }

                    // Natural damping
                    particle.vx *= 0.992
                    particle.vy *= 0.992

                    // Maximum speed
                    const speed = Math.hypot(
                        particle.vx,
                        particle.vy
                    )

                    if (speed > 0.7) {
                        particle.vx *= 0.7 / speed
                        particle.vy *= 0.7 / speed
                    }

                    // Boundary collision
                    if (particle.x < 0 || particle.x > width) {
                        particle.vx *= -1
                    }

                    if (particle.y < 0 || particle.y > height) {
                        particle.vy *= -1
                    }

                    particle.x = Math.max(
                        0,
                        Math.min(width, particle.x)
                    )

                    particle.y = Math.max(
                        0,
                        Math.min(height, particle.y)
                    )
                }

                // Pulsing size
                const pulse = reducedMotion
                    ? 1
                    : 1 + Math.sin(particle.phase) * 0.35

                const radius = particle.radius * pulse

                // Glowing particle
                ctx.beginPath()

                ctx.arc(
                    particle.x,
                    particle.y,
                    radius,
                    0,
                    Math.PI * 2
                )

                ctx.fillStyle = `rgba(${particle.color},0.9)`
                ctx.shadowBlur = 12
                ctx.shadowColor = `rgba(${particle.color},0.8)`

                ctx.fill()
                ctx.shadowBlur = 0

                // Soft outer glow
                ctx.beginPath()

                ctx.arc(
                    particle.x,
                    particle.y,
                    radius * 2.5,
                    0,
                    Math.PI * 2
                )

                ctx.fillStyle = `rgba(${particle.color},0.09)`
                ctx.fill()
            })

            // CONNECT PARTICLES
            particles.forEach((particle, index) => {
                particles.slice(index + 1).forEach((other) => {
                    const dx = particle.x - other.x
                    const dy = particle.y - other.y

                    const distance = Math.hypot(dx, dy)

                    if (distance < 135) {
                        const opacity =
                            0.18 * (1 - distance / 135)

                        ctx.beginPath()

                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(other.x, other.y)

                        ctx.strokeStyle = isDark
                            ? `rgba(167,139,250,${opacity})`
                            : `rgba(124,58,237,${opacity * 0.8})`

                        ctx.lineWidth = 0.7
                        ctx.stroke()
                    }
                })

                // CONNECT PARTICLES TO CURSOR
                if (pointer.active && !isTouch && !reducedMotion) {
                    const dx = particle.x - pointer.x
                    const dy = particle.y - pointer.y

                    const distance = Math.hypot(dx, dy)

                    if (distance < 165) {
                        const opacity =
                            0.28 * (1 - distance / 165)

                        ctx.beginPath()

                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(pointer.x, pointer.y)

                        ctx.strokeStyle = isDark
                            ? `rgba(251,146,60,${opacity})`
                            : `rgba(234,88,12,${opacity})`

                        ctx.lineWidth = 0.9
                        ctx.stroke()
                    }
                }
            })

            if (!reducedMotion) {
                animationId = requestAnimationFrame(draw)
            }
        }

        // VISIBILITY CONTROL
        const handleVisibility = () => {
            isVisible = !document.hidden

            cancelAnimationFrame(animationId)

            if (isVisible && !reducedMotion) {
                animationId = requestAnimationFrame(draw)
            }
        }

        resize()

        if (isVisible) {
            draw()
        }

        window.addEventListener('resize', resize)

        document.addEventListener(
            'visibilitychange',
            handleVisibility
        )

        if (!isTouch) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            cancelAnimationFrame(animationId)

            window.removeEventListener('resize', resize)

            document.removeEventListener(
                'visibilitychange',
                handleVisibility
            )

            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [isDark])

    // 3D CURSOR PARALLAX
    useEffect(() => {
        if (
            shouldReduceMotion ||
            window.matchMedia('(pointer: coarse)').matches
        ) return

        let frame

        const handleMove = (e) => {
            cancelAnimationFrame(frame)

            frame = requestAnimationFrame(() => {
                setMouse({
                    x: (e.clientX / window.innerWidth - 0.5) * 2,
                    y: (e.clientY / window.innerHeight - 0.5) * 2,
                })
            })
        }

        const handleLeave = () => {
            setMouse({ x: 0, y: 0 })
        }

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseleave', handleLeave)

        return () => {
            cancelAnimationFrame(frame)

            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseleave', handleLeave)
        }
    }, [shouldReduceMotion])

    return (
        <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
        >
            {/* PARTICLE CANVAS */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
            />

            {/* VIOLET 3D ORB */}
            <motion.div
                className="absolute -right-20 top-10 h-[300px] w-[300px] rounded-full blur-[90px] md:h-[450px] md:w-[450px]"
                animate={shouldReduceMotion ? {} : {
                    x: mouse.x * -65,
                    y: mouse.y * -65,
                    scale: [1, 1.12, 1],
                }}
                style={{
                    background: isDark
                        ? 'rgba(124,58,237,0.24)'
                        : 'rgba(124,58,237,0.14)',
                }}
                transition={{
                    x: { type: 'spring', stiffness: 45, damping: 18 },
                    y: { type: 'spring', stiffness: 45, damping: 18 },
                    scale: {
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
            />

            {/* ORANGE 3D ORB */}
            <motion.div
                className="absolute -bottom-20 left-[15%] h-[280px] w-[280px] rounded-full blur-[100px] md:h-[400px] md:w-[400px]"
                animate={shouldReduceMotion ? {} : {
                    x: mouse.x * 85,
                    y: mouse.y * 85,
                    scale: [1, 1.15, 1],
                }}
                style={{
                    background: isDark
                        ? 'rgba(251,146,60,0.20)'
                        : 'rgba(234,88,12,0.13)',
                }}
                transition={{
                    x: { type: 'spring', stiffness: 35, damping: 16 },
                    y: { type: 'spring', stiffness: 35, damping: 16 },
                    scale: {
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
            />

            {/* PERSPECTIVE GRID */}
            <motion.div
                className="absolute inset-x-0 bottom-0 h-[45%]"
                animate={shouldReduceMotion ? {} : {
                    x: mouse.x * -18,
                    y: mouse.y * -18,
                    rotateX: 55,
                }}
                style={{
                    backgroundImage: `
                        linear-gradient(
                            ${isDark
                                ? 'rgba(167,139,250,0.10)'
                                : 'rgba(124,58,237,0.07)'
                            } 1px, transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            ${isDark
                                ? 'rgba(167,139,250,0.10)'
                                : 'rgba(124,58,237,0.07)'
                            } 1px, transparent 1px
                        )
                    `,
                    backgroundSize: '55px 55px',
                    maskImage: 'linear-gradient(to bottom, transparent, black)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
                    transformOrigin: 'bottom',
                    perspective: 400,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 40,
                    damping: 20,
                }}
            />

            {/* THEME BLEND */}
            <div
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? 'radial-gradient(ellipse at center, transparent 15%, #100d18 100%)'
                        : 'radial-gradient(ellipse at center, transparent 15%, #fff8f2 100%)',
                }}
            />
        </div>
    )
}

export default HeroBackground

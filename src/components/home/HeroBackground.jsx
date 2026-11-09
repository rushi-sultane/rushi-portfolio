import { useEffect, useRef } from 'react'
import {
    m,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

function HeroBackground() {
    const canvasRef = useRef(null)
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const shouldReduceMotion = useReducedMotion()

    // Motion values move the decorative layers without React re-renders.
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothMouseX = useSpring(mouseX, {
        stiffness: 45,
        damping: 18,
        mass: 0.8,
    })

    const smoothMouseY = useSpring(mouseY, {
        stiffness: 45,
        damping: 18,
        mass: 0.8,
    })

    const violetX = useTransform(smoothMouseX, (value) => value * -65)
    const violetY = useTransform(smoothMouseY, (value) => value * -65)
    const orangeX = useTransform(smoothMouseX, (value) => value * 85)
    const orangeY = useTransform(smoothMouseY, (value) => value * 85)
    const gridX = useTransform(smoothMouseX, (value) => value * -18)
    const gridY = useTransform(smoothMouseY, (value) => value * -18)

    // PARTICLE NETWORK
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        let animationId = 0
        let particles = []
        let width = 0
        let height = 0
        let isVisible = !document.hidden

        const pointer = {
            x: -1000,
            y: -1000,
            active: false,
        }

        const isTouch = window.matchMedia('(pointer: coarse)').matches
        const reducedMotion = Boolean(shouldReduceMotion)

        const violet = isDark ? '167,139,250' : '124,58,237'
        const orange = isDark ? '251,146,60' : '234,88,12'

        const connectionDistance = 135
        const connectionDistanceSquared =
            connectionDistance * connectionDistance
        const interactionRadius = 180
        const interactionRadiusSquared =
            interactionRadius * interactionRadius
        const cursorDistance = 165
        const cursorDistanceSquared = cursorDistance * cursorDistance

        const resize = () => {
            const rect = canvas.getBoundingClientRect()
            width = rect.width
            height = rect.height

            // A slightly lower mobile DPR reduces canvas fill and compositing cost.
            const maxDpr = isTouch ? 1.5 : 2
            const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)

            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            const area = width * height
            const count = Math.min(
                Math.max(Math.floor(area / 10000), 30),
                100
            )

            particles = Array.from({ length: count }, (_, index) => {
                const color = index % 4 === 0 ? orange : violet

                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    radius: Math.random() * 1.7 + 0.7,
                    phase: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.025 + 0.008,
                    fillColor: `rgba(${color},0.9)`,
                    softColor: `rgba(${color},0.09)`,
                }
            })
        }

        const handleMouseMove = (event) => {
            if (isTouch || reducedMotion) return

            const rect = canvas.getBoundingClientRect()
            pointer.x = event.clientX - rect.left
            pointer.y = event.clientY - rect.top
            pointer.active =
                pointer.x >= 0 &&
                pointer.x <= width &&
                pointer.y >= 0 &&
                pointer.y <= height
        }

        const handleMouseLeave = () => {
            pointer.active = false
            pointer.x = -1000
            pointer.y = -1000
        }

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

            // Update and draw particles
            for (let i = 0; i < particles.length; i += 1) {
                const particle = particles[i]

                if (!reducedMotion) {
                    particle.phase += particle.pulseSpeed
                    particle.x += particle.vx
                    particle.y += particle.vy

                    // Cursor interaction: avoid square roots until inside the radius.
                    if (pointer.active && !isTouch) {
                        const dx = particle.x - pointer.x
                        const dy = particle.y - pointer.y
                        const distanceSquared = dx * dx + dy * dy

                        if (
                            distanceSquared < interactionRadiusSquared &&
                            distanceSquared > 0
                        ) {
                            const distance = Math.sqrt(distanceSquared)
                            const force =
                                (interactionRadius - distance) / interactionRadius
                            const inverseDistance = 1 / distance

                            particle.vx += dx * inverseDistance * force * 0.035
                            particle.vy += dy * inverseDistance * force * 0.035
                            particle.vx += -dy * inverseDistance * force * 0.012
                            particle.vy += dx * inverseDistance * force * 0.012
                        }
                    }

                    // Natural damping
                    particle.vx *= 0.995
                    particle.vy *= 0.995

                    // Maximum speed
                    const speedSquared =
                        particle.vx * particle.vx +
                        particle.vy * particle.vy

                    if (speedSquared > 1.44) {
                        const scale = 1.2 / Math.sqrt(speedSquared)
                        particle.vx *= scale
                        particle.vy *= scale
                    }

                    // Boundary collision
                    if (particle.x < 0 || particle.x > width) {
                        particle.vx *= -1
                    }

                    if (particle.y < 0 || particle.y > height) {
                        particle.vy *= -1
                    }

                    particle.x = Math.max(0, Math.min(width, particle.x))
                    particle.y = Math.max(0, Math.min(height, particle.y))
                }

                const pulse = reducedMotion
                    ? 1
                    : 1 + Math.sin(particle.phase) * 0.35
                const radius = particle.radius * pulse

                // Draw the particle and its soft halo.
                // The halo replaces per-particle shadowBlur, which is expensive on canvas.
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, radius * 2.5, 0, Math.PI * 2)
                ctx.fillStyle = particle.softColor
                ctx.fill()

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
                ctx.fillStyle = particle.fillColor
                ctx.fill()
            }

            // Connect nearby particles.
            ctx.lineWidth = 0.7

            for (let i = 0; i < particles.length; i += 1) {
                const particle = particles[i]

                for (let j = i + 1; j < particles.length; j += 1) {
                    const other = particles[j]
                    const dx = particle.x - other.x
                    const dy = particle.y - other.y
                    const distanceSquared = dx * dx + dy * dy

                    if (distanceSquared < connectionDistanceSquared) {
                        const distance = Math.sqrt(distanceSquared)
                        const opacity =
                            0.18 * (1 - distance / connectionDistance)

                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(other.x, other.y)
                        ctx.strokeStyle = isDark
                            ? `rgba(167,139,250,${opacity})`
                            : `rgba(124,58,237,${opacity * 0.8})`
                        ctx.stroke()
                    }
                }

                // Connect nearby particles to the cursor.
                if (pointer.active && !isTouch && !reducedMotion) {
                    const dx = particle.x - pointer.x
                    const dy = particle.y - pointer.y
                    const distanceSquared = dx * dx + dy * dy

                    if (distanceSquared < cursorDistanceSquared) {
                        const distance = Math.sqrt(distanceSquared)
                        const opacity =
                            0.28 * (1 - distance / cursorDistance)

                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(pointer.x, pointer.y)
                        ctx.strokeStyle = isDark
                            ? `rgba(251,146,60,${opacity})`
                            : `rgba(234,88,12,${opacity})`
                        ctx.lineWidth = 0.9
                        ctx.stroke()
                        ctx.lineWidth = 0.7
                    }
                }
            }

            if (!reducedMotion) {
                animationId = requestAnimationFrame(draw)
            }
        }

        const stopAnimation = () => {
            if (animationId) {
                cancelAnimationFrame(animationId)
                animationId = 0
            }
        }

        const handleVisibility = () => {
            isVisible = !document.hidden
            stopAnimation()

            if (isVisible) {
                draw()
            }
        }

        const handleResize = () => {
            resize()
            stopAnimation()

            if (isVisible) {
                draw()
            }
        }

        resize()

        if (isVisible) {
            draw()
        }

        window.addEventListener('resize', handleResize, { passive: true })
        document.addEventListener('visibilitychange', handleVisibility)

        if (!isTouch && !reducedMotion) {
            window.addEventListener('mousemove', handleMouseMove, {
                passive: true,
            })
            window.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            stopAnimation()
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('visibilitychange', handleVisibility)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [isDark, shouldReduceMotion])

    // 3D CURSOR PARALLAX
    useEffect(() => {
        if (
            shouldReduceMotion ||
            window.matchMedia('(pointer: coarse)').matches
        ) {
            mouseX.set(0)
            mouseY.set(0)
            return
        }

        const handleMove = (event) => {
            mouseX.set((event.clientX / window.innerWidth - 0.5) * 2)
            mouseY.set((event.clientY / window.innerHeight - 0.5) * 2)
        }

        const handleLeave = () => {
            mouseX.set(0)
            mouseY.set(0)
        }

        window.addEventListener('mousemove', handleMove, { passive: true })
        window.addEventListener('mouseleave', handleLeave)

        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('mouseleave', handleLeave)
        }
    }, [shouldReduceMotion, mouseX, mouseY])

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
            <m.div
                className="absolute -right-20 top-10 h-[300px] w-[300px] rounded-full blur-[90px] md:h-[450px] md:w-[450px]"
                style={{
                    x: violetX,
                    y: violetY,
                    background: isDark
                        ? 'rgba(124,58,237,0.24)'
                        : 'rgba(124,58,237,0.14)',
                }}
                animate={shouldReduceMotion ? {} : {
                    scale: [1, 1.12, 1],
                }}
                transition={{
                    scale: {
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
            />

            {/* ORANGE 3D ORB */}
            <m.div
                className="absolute -bottom-20 left-[15%] h-[280px] w-[280px] rounded-full blur-[100px] md:h-[400px] md:w-[400px]"
                style={{
                    x: orangeX,
                    y: orangeY,
                    background: isDark
                        ? 'rgba(251,146,60,0.20)'
                        : 'rgba(234,88,12,0.13)',
                }}
                animate={shouldReduceMotion ? {} : {
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    scale: {
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
            />

            {/* PERSPECTIVE GRID */}
            <m.div
                className="absolute inset-x-0 bottom-0 h-[45%]"
                style={{
                    x: gridX,
                    y: gridY,
                    rotateX: 55,
                    backgroundImage: `
                        linear-gradient(
                            ${
                                isDark
                                    ? 'rgba(167,139,250,0.10)'
                                    : 'rgba(124,58,237,0.07)'
                            } 1px, transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            ${
                                isDark
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

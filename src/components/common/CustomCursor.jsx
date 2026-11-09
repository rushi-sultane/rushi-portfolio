import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function CustomCursor() {
    const [hovering, setHovering] = useState(false)
    const [visible, setVisible] = useState(false)
    const hoveringRef = useRef(false)
    const x = useMotionValue(-100)
    const y = useMotionValue(-100)

    const springX = useSpring(x, { stiffness: 650, damping: 40, mass: 0.2 })
    const springY = useSpring(y, { stiffness: 650, damping: 40, mass: 0.2 })

    useEffect(() => {
        const pointerQuery = window.matchMedia('(pointer: coarse)')
        if (pointerQuery.matches) return

        const move = (event) => {
            x.set(event.clientX)
            y.set(event.clientY)

            if (!visible) setVisible(true)

            const target = event.target instanceof Element
                ? event.target.closest('a, button, [data-cursor], input, textarea')
                : null
            const nextHovering = Boolean(target)

            // Avoid React state updates on every mouse movement.
            if (nextHovering !== hoveringRef.current) {
                hoveringRef.current = nextHovering
                setHovering(nextHovering)
            }
        }

        const leave = () => {
            setVisible(false)
            hoveringRef.current = false
            setHovering(false)
        }

        window.addEventListener('pointermove', move, { passive: true })
        document.addEventListener('pointerleave', leave)

        return () => {
            window.removeEventListener('pointermove', move)
            document.removeEventListener('pointerleave', leave)
        }
    }, [x, y, visible])

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
            style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
            transition={{ opacity: { duration: 0.2 } }}
        >
            {/* Outer Ring */}
            <motion.div
                className="absolute -left-[9px] -top-[9px] rounded-full border"
                animate={{
                    width: hovering ? 26 : 18,
                    height: hovering ? 26 : 18,
                    borderColor: hovering ? '#a78bfa' : '#fb923c',
                    backgroundColor: 'transparent',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            />

            {/* Center Dot */}
            <motion.div
                className="absolute -left-[2px] -top-[2px] h-1 w-1 rounded-full"
                animate={{
                    scale: hovering ? 0.7 : 1,
                    backgroundColor: '#a78bfa',
                }}
                transition={{ duration: 0.2 }}
            />
        </motion.div>
    )
}

export default CustomCursor

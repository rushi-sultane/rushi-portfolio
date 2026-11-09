
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 })
    const [hovering, setHovering] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return

        const move = (e) => {
            setPosition({ x: e.clientX, y: e.clientY })
            setVisible(true)

            const target = e.target.closest(
                'a, button, [data-cursor], input, textarea'
            )

            setHovering(Boolean(target))
        }

        const leave = () => {
            setVisible(false)
            setHovering(false)
        }

        window.addEventListener('mousemove', move)
        document.addEventListener('mouseleave', leave)

        return () => {
            window.removeEventListener('mousemove', move)
            document.removeEventListener('mouseleave', leave)
        }
    }, [])

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:block"
            animate={{
                x: position.x,
                y: position.y,
                opacity: visible ? 1 : 0,
            }}
            transition={{
                x: { type: 'spring', stiffness: 650, damping: 40 },
                y: { type: 'spring', stiffness: 650, damping: 40 },
                opacity: { duration: 0.2 },
            }}
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
                transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                }}
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

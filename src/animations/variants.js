export const fadeUp = {
    hidden: {
        opacity: 0,
        y: 60,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

export const revealText = {
    hidden: {
        opacity: 0,
        y: 80,
        rotateX: -30,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}
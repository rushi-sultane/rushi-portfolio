import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import Preloader from '../components/common/Preloader'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/home/Hero'

const CustomCursor = lazy(() => import('../components/common/CustomCursor'))

const Footer = lazy(() => import('../components/layout/Footer'))
const AboutPreview = lazy(() => import('../components/home/AboutPreview'))
const TechStack = lazy(() => import('../components/home/TechStack'))
const FeaturedProjects = lazy(() => import('../components/home/FeaturedProjects'))
const ContactCTA = lazy(() => import('../components/home/ContactCTA'))

const SECTION_ROOT_MARGIN = '400px 0px'

function DeferredSection({ children, minHeight = '400px' }) {
    const sectionRef = useRef(null)
    const [shouldLoad, setShouldLoad] = useState(false)

    useEffect(() => {
        const element = sectionRef.current
        if (!element) return

        // Load immediately in browsers without IntersectionObserver support.
        if (!('IntersectionObserver' in window)) {
            setShouldLoad(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true)
                    observer.disconnect()
                }
            },
            {
                root: null,
                rootMargin: SECTION_ROOT_MARGIN,
                threshold: 0,
            }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={sectionRef} style={{ minHeight }}>
            {shouldLoad && (
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            )}
        </div>
    )
}

function Home() {
    const [enableCursor, setEnableCursor] = useState(false)

    // Load the custom cursor only when the active device has a precise pointer.
    useEffect(() => {
        const pointerQuery = window.matchMedia('(pointer: fine)')

        const updateCursor = () => {
            setEnableCursor(pointerQuery.matches)
        }

        updateCursor()

        pointerQuery.addEventListener('change', updateCursor)

        return () => {
            pointerQuery.removeEventListener('change', updateCursor)
        }
    }, [])

    return (
        <>
            <Preloader />
            <Navbar />

            <main>
                <Hero />

                <DeferredSection minHeight="500px">
                    <AboutPreview />
                </DeferredSection>

                <DeferredSection minHeight="500px">
                    <TechStack />
                </DeferredSection>

                <DeferredSection minHeight="700px">
                    <FeaturedProjects />
                </DeferredSection>

                <DeferredSection minHeight="350px">
                    <ContactCTA />
                </DeferredSection>
            </main>

            <DeferredSection minHeight="350px">
                <Footer />
            </DeferredSection>

            {enableCursor && (
                <Suspense fallback={null}>
                    <CustomCursor />
                </Suspense>
            )}
        </>
    )
}

export default Home

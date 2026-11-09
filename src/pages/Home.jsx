
import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import Preloader from '../components/common/Preloader'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'

const AboutPreview = lazy(() => import('../components/home/AboutPreview'))
const TechStack = lazy(() => import('../components/home/TechStack'))
const FeaturedProjects = lazy(() => import('../components/home/FeaturedProjects'))
const ContactCTA = lazy(() => import('../components/home/ContactCTA'))

function DeferredSection({ children, minHeight = '400px' }) {
    const sectionRef = useRef(null)
    const [shouldLoad, setShouldLoad] = useState(false)

    useEffect(() => {
        const element = sectionRef.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '400px 0px' }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={sectionRef} style={{ minHeight }}>
            {shouldLoad && (
                <Suspense fallback={<div aria-hidden="true" />}>
                    {children}
                </Suspense>
            )}
        </div>
    )
}

function Home() {
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

            <Footer />
        </>
    )
}

export default Home

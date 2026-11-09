
import Preloader from '../components/common/Preloader'
import CustomCursor from '../components/common/CustomCursor'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

import Hero from '../components/home/Hero'
import AboutPreview from '../components/home/AboutPreview'
import TechStack from '../components/home/TechStack'
import FeaturedProjects from '../components/home/FeaturedProjects'
import ContactCTA from '../components/home/ContactCTA'

function Home() {
    return (
        <>
            <Preloader />
            <Navbar />

            <main>
                <Hero />
                <AboutPreview />
                <TechStack />
                <FeaturedProjects />
                <ContactCTA />
            </main>

            <Footer />
            <CustomCursor />
        </>
    )
}

export default Home

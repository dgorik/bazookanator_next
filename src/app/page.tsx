import Dashboard from '@/src/components/layout/sections/Dashboard'
import FAQSection from '@/src/components/layout/sections/Faq'
import HeroSection from '@/src/components/layout/sections/HeroSection'
import ContactSection from '@/src/components/layout/sections/Contact'
import Footer from '@/src/components/layout/sections/Footer'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Dashboard />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

import Dashboard from '@/components/layout/sections/Dashboard'
import FAQSection from '@/components/layout/sections/Faq'
import HeroSection from '@/components/layout/sections/HeroSection'
import ContactSection from '@/components/layout/sections/Contact'
import Footer from '@/components/layout/sections/Footer'

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

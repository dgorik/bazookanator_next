import Dashboard from '@/components/layout/sections/Dashboard'
import FAQSection from '@/components/layout/sections/Faq'
import HeroSection from '@/components/layout/sections/HeroSection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Dashboard />
      <FAQSection />
    </div>
  )
}

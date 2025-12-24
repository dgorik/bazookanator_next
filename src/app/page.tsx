import dynamic from 'next/dynamic'
import FAQSection from '@/src/components/layout/sections/Faq'
import HeroSection from '@/src/components/layout/sections/HeroSection'
import ContactSection from '@/src/components/layout/sections/Contact'
import Footer from '@/src/components/layout/sections/Footer'

const Dashboard = dynamic(
  () => import('@/src/components/layout/sections/Dashboard'),
  {
    loading: () => <div className="h-48" />,
  },
)

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

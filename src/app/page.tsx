import AnimatedCounter from '@/components/layout/sections/AnimatedCounter'
import FAQSection from '@/components/layout/sections/Faq'
import HeroSection from '@/components/layout/sections/HeroSection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AnimatedCounter />
      <FAQSection />
    </div>
  )
}

import { Badge } from '@/src/components/ui/badge/badge'

export default function HeroSection() {
  return (
    <section id="herosection" className="container mx-auto p-4">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-4 rounded-2xl">
          <Badge variant="outline">
            <span className="mr-2 text-primary">
              <Badge>New</Badge>
            </span>
            <span> JD Mystery Gummy Cube is Out</span>
          </Badge>
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Experience the
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                Bazookanator
              </span>
            </h1>
          </div>
          <p className="max-w-screen-md mx-auto text-lg text-muted-foreground">
            We're more than just a tool, we're a community of passionate
            creators. Get access to exclusive resources, tutorials, and support
          </p>
        </div>
      </div>
    </section>
  )
}

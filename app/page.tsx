import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Wrench, Car, Clock, ShieldCheck, Phone, MapPin, Star, Settings, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AutoRepairShop() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Wrench className="h-6 w-6 text-primary" />
            <span>
              Apex<span className="text-primary">Auto</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="#reviews" className="hover:text-primary transition-colors">
              Reviews
            </Link>
            <Link href="#contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="tel:+1234567890"
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white"
            >
              <Phone className="h-4 w-4" />
              (555) 123-4567
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold" asChild>
              <Link href="/book">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 z-0">
            <Image
              src="/luxury-car-on-lift-dark-garage.jpg"
              alt="Workshop background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-secondary/50 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Now accepting new clients for 2025
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Expert care for your <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  high-performance vehicle.
                </span>
              </h1>

              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Stop worrying about dealership prices. We provide factory-level diagnostics, maintenance, and repairs
                with a personal touch and transparent pricing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12" asChild>
                  <Link href="/book">Schedule Service</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-12"
                  asChild
                >
                  <Link href="#services">View Service Menu</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full max-w-3xl border-t border-white/10 mt-8">
                <div>
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">5k+</div>
                  <div className="text-sm text-muted-foreground">Cars Repaired</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24h</div>
                  <div className="text-sm text-muted-foreground">Turnaround Avg</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="py-12 border-y border-white/5 bg-secondary/20">
          <div className="container mx-auto px-4 md:px-6">
            <p className="text-center text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
              Specializing in Premium & Import Brands
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using text for brands as placeholders, logos would be images */}
              <span className="text-xl font-bold tracking-widest hover:text-white cursor-default">BMW</span>
              <span className="text-xl font-bold tracking-widest hover:text-white cursor-default">MERCEDES</span>
              <span className="text-xl font-bold tracking-widest hover:text-white cursor-default">AUDI</span>
              <span className="text-xl font-bold tracking-widest hover:text-white cursor-default">PORSCHE</span>
              <span className="text-xl font-bold tracking-widest hover:text-white cursor-default">TOYOTA</span>
              <span className="text-xl font-bold tracking-widest hover:text-white cursor-default">HONDA</span>
            </div>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section id="services" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comprehensive Services</h2>
                <p className="text-muted-foreground max-w-[600px] text-lg">
                  From routine maintenance to complex engine overhauls, our certified technicians handle it all.
                </p>
              </div>
              <Button variant="link" className="text-primary p-0 h-auto font-semibold">
                Explore all services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large Card Left */}
              <Card className="md:col-span-2 md:row-span-2 bg-card border-white/10 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Car className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                    Complete Diagnostics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-lg">
                    Stop guessing what's wrong with your car. We use dealer-grade computer diagnostics to pinpoint
                    issues with 100% accuracy before we touch a wrench.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      "Check Engine Light Analysis",
                      "Computer Systems Scan",
                      "Electrical Testing",
                      "Performance Tuning",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="relative h-48 w-full mt-6 rounded-lg overflow-hidden bg-secondary/50">
                    <Image
                      src="/car-dashboard-diagnostic-screen.jpg"
                      alt="Diagnostics"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Small Card Top Right */}
              <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-primary group-hover:rotate-90 transition-transform duration-700" />
                    Engine Repair
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Expert engine rebuilding, timing belts, head gaskets, and transmission services.
                  </p>
                  <div className="h-1 w-12 bg-primary rounded-full" />
                </CardContent>
              </Card>

              {/* Small Card Middle Right */}
              <Card className="bg-card border-white/10 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    Brake & Safety
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Premium brake pads, rotors, ABS systems, and comprehensive safety inspections.
                  </p>
                  <div className="h-1 w-12 bg-primary rounded-full" />
                </CardContent>
              </Card>

              {/* Wide Card Bottom */}
              <Card className="md:col-span-3 bg-secondary/30 border-white/10 flex flex-col md:flex-row items-center overflow-hidden">
                <div className="p-6 md:p-8 flex-1 space-y-4">
                  <h3 className="text-2xl font-bold">Oil Change & Maintenance</h3>
                  <p className="text-muted-foreground">
                    Regular maintenance is the key to longevity. Our premium oil change service includes a 32-point
                    inspection, fluid top-off, and tire pressure check.
                  </p>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    See Maintenance Packages
                  </Button>
                </div>
                <div className="relative w-full md:w-1/3 h-48 md:h-full min-h-[200px]">
                  <Image src="/car-engine-clean-closeup.jpg" alt="Oil Change" fill className="object-cover" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 border-y border-white/5 bg-secondary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Why locals trust <span className="text-primary">Apex Auto</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  We believe in doing the job right the first time. No hidden fees, no unnecessary upsells, just honest
                  mechanical work backed by our warranty.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Fast Turnaround</h4>
                      <p className="text-sm text-muted-foreground">
                        Most repairs completed same-day or within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">2-Year / 24k Mile Warranty</h4>
                      <p className="text-sm text-muted-foreground">We stand behind our parts and labor nationwide.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
                      <Settings className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">ASE Certified Technicians</h4>
                      <p className="text-sm text-muted-foreground">
                        Our team undergoes continuous training on the latest vehicle systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/mechanic-tools-workbench-dark.jpg"
                  alt="Workshop Interior"
                  width={800}
                  height={600}
                  className="object-cover"
                />
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur border border-white/10 p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                      <Star className="h-6 w-6 fill-current" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">"Best shop in town!"</div>
                      <div className="text-xs text-muted-foreground">Verified Google Review</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground max-w-[600px] mx-auto">
                Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-card border-white/10">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;Excellent service! They diagnosed my car&apos;s problem quickly and fixed it at a fair price. Highly recommend!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      J
                    </div>
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-muted-foreground">BMW Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-white/10">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;Best auto shop I&apos;ve ever been to. Professional staff, clean facility, and they explain everything clearly.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-medium">Michael Johnson</p>
                      <p className="text-sm text-muted-foreground">Mercedes Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-white/10">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;Fast turnaround and great communication. They kept me updated throughout the repair process.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      D
                    </div>
                    <div>
                      <p className="font-medium">David Williams</p>
                      <p className="text-sm text-muted-foreground">Audi Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-24 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl mb-6">
              Ready to get your car running like new?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg mb-10">
              Schedule your appointment online or give us a call. We offer free shuttle service within 5 miles while
              your car is being serviced.
            </p>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
              <Card className="flex-1 bg-secondary/50 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5 text-primary" /> Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold mb-2">(555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 7am - 6pm <br /> Sat: 8am - 2pm
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-1 bg-secondary/50 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> Visit Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg font-medium mb-2">
                    123 Motor Ave <br /> Detroit, MI 48201
                  </p>
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 max-w-md mx-auto">
              <form className="flex gap-2">
                <Input placeholder="Enter your email for 10% off" className="bg-background border-white/20 h-12" />
                <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-12">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                Join our newsletter for maintenance tips and exclusive seasonal offers.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-background py-12 text-sm">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Wrench className="h-5 w-5 text-primary" />
              <span>
                Apex<span className="text-primary">Auto</span>
              </span>
            </Link>
            <p className="text-muted-foreground">
              Professional auto repair services you can trust. Family owned and operated since 2010.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Oil Change
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Brake Repair
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Engine Diagnostics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Tires & Alignment
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="sr-only">Facebook</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <span className="sr-only">Instagram</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427a4.902 4.902 0 011.153 1.772 4.902 4.902 0 011.772 1.153c.636.247 1.363.416 2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.636-.247-1.363-.416-2.427-.465-1.067-.048-1.407-.06-4.123-.06h-.165zm-2.38-1.737c-3.037.002-3.898.118-4.746.444-1.25.48-2.214 1.444-2.694 2.694-.326.848-.442 1.71-.444 4.746v.326c0 2.43.013 2.784.06 3.808.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153 1.772 4.902 4.902 0 011.772 1.153c.636.247 1.363.416 2.427.465C9.673 2.013 10.03 2 12.48 2h-.165zm-2.38-1.737c-3.037.002-3.898.118-4.746.444-1.25.48-2.214 1.444-2.694 2.694-.326.848-.442 1.71-.444 4.746v.326c0 2.43.013 2.784.06 3.808.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153 1.772 4.902 4.902 0 011.772 1.153c-.636-.247-1.363-.416-2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-2.38-1.737c-3.037.002-3.898.118-4.746.444-1.25.48-2.214 1.444-2.694 2.694-.326.848-.442 1.71-.444 4.746v.326c0 2.43.013 2.784.06 3.808.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153 1.772 4.902 4.902 0 011.772 1.153c.636-.247 1.363-.416 2.427-.465h.326c3.037-.002 3.898-.118 4.746-.444 1.25-.48 2.214-1.444 2.694-2.694.848-.326 1.71-.442 4.746-.444h.326zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.25-6.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-white/5 text-center text-muted-foreground">
          © 2025 Apex Auto Repair. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

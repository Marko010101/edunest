import type { Metadata } from "next";
import {
  ArrowRight,
  MapPin,
  Globe,
  HeartHandshake,
  Shield,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Users,
  BookOpen,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/shared/Button";
import { JsonLd } from "@/components/seo/JsonLd";

// ─── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "About Us — Georgia-Based Education Consultancy",
  description:
    "Edunest is a Georgia-based international education consultancy dedicated to connecting students with accredited universities. Learn about our mission, values, and on-the-ground approach.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Edunest — Bridging Ambition with Opportunity",
    description:
      "Georgia-based education consultancy offering complete pathway support — from counselling and placement to visa, relocation, and ongoing guidance.",
    url: "/about",
  },
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    Icon: MapPin,
    title: "Georgia-Based Advantage",
    description:
      "Our operational base in Georgia provides direct institutional access and day-to-day local intelligence that no remote consultancy can replicate.",
  },
  {
    Icon: Globe,
    title: "Global Perspective",
    description:
      "We combine international awareness with genuine in-country presence — delivering a dual advantage from your very first enquiry.",
  },
  {
    Icon: HeartHandshake,
    title: "Continuous In-Country Support",
    description:
      "Our role does not end at admission. We stay alongside students through visa, relocation, and every challenge that follows.",
  },
] as const;

const PATHWAY_STEPS = [
  { step: "01", label: "Counselling", desc: "Personalised assessment and university shortlisting" },
  { step: "02", label: "Placement", desc: "Applications, documentation, and admission" },
  { step: "03", label: "Visa", desc: "End-to-end student visa processing" },
  { step: "04", label: "Relocation", desc: "Accommodation, orientation, and arrival" },
  { step: "05", label: "Ongoing", desc: "Continuous academic and personal guidance" },
] as const;

const VALUES = [
  {
    Icon: Shield,
    title: "Professionalism",
    description:
      "Every interaction, document, and decision is handled with exacting professional standards. We take the detail seriously so you can focus on what matters.",
  },
  {
    Icon: CheckCircle2,
    title: "Ethical Practice",
    description:
      "Full transparency at every stage — no hidden fees, no inflated promises. Only honest, accurate guidance you can stake your future on.",
  },
  {
    Icon: GraduationCap,
    title: "Student Success",
    description:
      "Our measure of success is yours. We focus on long-term outcomes — academic achievement, cultural confidence, and professional readiness.",
  },
] as const;

const PARTNER_FEATURES = [
  {
    Icon: BookOpen,
    label: "Accredited University Network",
    desc: "All partner institutions meet WHO, NMC, and international academic standards",
  },
  {
    Icon: Globe,
    label: "Cultural Integration Support",
    desc: "Programmes designed to help students adapt, thrive, and grow in Georgia",
  },
  {
    Icon: Users,
    label: "Long-Term Relationship",
    desc: "We stay with you from first enquiry through graduation — and beyond",
  },
  {
    Icon: Briefcase,
    label: "Professional Growth Focus",
    desc: "We nurture independence and global-readiness, not just academic placement",
  },
] as const;

// ─── JSON-LD ───────────────────────────────────────────────────────────────────
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Edunest",
  url: "https://edunest.in/about",
  description:
    "Edunest is a Georgia-based international education consultancy helping students access accredited universities in Georgia.",
  mainEntity: {
    "@type": "Organization",
    name: "Edunest",
    foundingDate: "2019",
    description: "Georgia-based international education consultancy",
    areaServed: "India",
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative bg-hero-gradient overflow-hidden pt-[136px] pb-20 md:pt-[156px] md:pb-28"
        aria-label="About us"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <div className="absolute -top-20 right-0 w-[480px] h-[480px] rounded-full bg-navy-400/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-gold/8 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="container-padded relative z-10">
          {/* Location tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-gold" aria-hidden="true" />
            <span className="text-white/75 text-xs font-medium tracking-wide">Headquartered in Tbilisi, Georgia</span>
          </div>

          <h1 className="heading-display text-white mb-6 max-w-3xl">
            Education Consultancy from the <span className="text-gradient-gold">Heart of Georgia</span>
          </h1>
          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-xl">
            Georgia-based. Globally minded. Committed to every student&apos;s journey from first enquiry to final
            graduation.
          </p>
        </div>
      </section>

      {/* ── 2. Who We Are ────────────────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="who-we-are-heading">
        <div className="container-padded">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text block */}
            <AnimatedSection>
              <p className="eyebrow mb-3">Who We Are</p>
              <h2 id="who-we-are-heading" className="heading-section text-navy mb-6">
                Built on Ground-Level Knowledge
              </h2>
              <div className="space-y-4 text-muted leading-relaxed text-[15px]">
                <p>
                  Edunest is a Georgia-based international education consultancy dedicated to facilitating access to
                  high-quality, globally recognised medical education. With our operational base in Georgia, we offer
                  students a strategic advantage through direct institutional connections, local expertise, and
                  continuous in-country support.
                </p>
                <p>
                  By combining a global perspective with genuine local presence, Edunest ensures accuracy, reliability,
                  and a seamless experience at every stage of your academic journey.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/contact">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </AnimatedSection>

            {/* Stat grid */}
            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {(
                  [
                    { value: "500+", label: "Students Supported", sub: "and growing" },
                    { value: "15+", label: "Partner Universities", sub: "all NMC recognised" },
                    { value: "6+", label: "Years in Georgia", sub: "on-the-ground presence" },
                    { value: "98%", label: "Visa Success Rate", sub: "industry-leading" },
                  ] as const
                ).map(({ value, label, sub }) => (
                  <div key={label} className="bg-cream rounded-2xl p-6 border border-amber-100/60">
                    <p className="font-display font-bold text-3xl text-navy mb-0.5 leading-none">{value}</p>
                    <p className="font-semibold text-charcoal text-sm mt-1">{label}</p>
                    <p className="text-muted text-xs mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 7. Closing Quote CTA ──────────────────────────────────────────── */}
      <section className="section-padding" aria-label="Our promise">
        <div className="container-padded">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-3xl bg-navy text-center px-8 py-16 md:px-20 md:py-24">
              {/* Background blobs */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-navy-400/20 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Decorative quote marks */}
              <div
                className="absolute top-8 left-10 font-display text-[120px] leading-none text-white/[0.04] select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <div
                className="absolute bottom-0 right-10 font-display text-[120px] leading-none text-white/[0.04] select-none pointer-events-none"
                aria-hidden="true"
              >
                &rdquo;
              </div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <p className="eyebrow text-gold mb-6">Our Promise</p>

                <blockquote className="font-display font-bold text-3xl md:text-5xl text-white leading-[1.15] mb-8">
                  Bridging ambition with opportunity — from the heart of Georgia.
                </blockquote>

                <p className="text-navy-200 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
                  Your goals deserve more than a brochure and a form. They deserve a partner who knows the path because
                  they walk it every day.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button href="/contact" size="lg">
                    Talk to Our Team
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button href="/universities" variant="outline" size="lg">
                    Explore Universities
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 3. The Edunest Edge ───────────────────────────────────────────── */}
      <section className="section-padding bg-cream" aria-labelledby="edge-heading">
        <div className="container-padded">
          <AnimatedSection className="text-center mb-14">
            <p className="eyebrow mb-3">The Edunest Edge</p>
            <h2 id="edge-heading" className="heading-section text-navy mb-4">
              Why Being in Georgia Changes Everything
            </h2>
            <p className="text-muted max-w-2xl mx-auto leading-relaxed">
              Most consultancies advise from a distance. We operate from within — giving our students an advantage that
              only comes from genuine, day-to-day presence on the ground.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PILLARS.map(({ Icon, title, description }) => (
              <StaggerItem key={title}>
                <article className="card-base p-8 h-full text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-navy mx-auto flex items-center justify-center mb-5 shadow-md">
                    <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-navy mb-3">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 4. Complete Pathway ───────────────────────────────────────────── */}
      <section className="section-padding" aria-labelledby="pathway-heading">
        <div className="container-padded">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: text */}
            <AnimatedSection>
              <p className="eyebrow mb-3">How We Work</p>
              <h2 id="pathway-heading" className="heading-section text-navy mb-5">
                A Complete, Structured Pathway — Start to Finish
              </h2>
              <p className="text-muted leading-relaxed text-[15px]">
                Our services are designed to provide a fully guided route from your first conversation with us to the
                moment you step into your Georgian university — and every milestone that follows. No gaps. No guesswork.
              </p>
            </AnimatedSection>

            {/* Right: steps */}
            <AnimatedSection delay={0.12}>
              <ol className="flex flex-col gap-0" aria-label="Our pathway steps">
                {PATHWAY_STEPS.map(({ step, label, desc }, i) => (
                  <li key={step} className="relative flex gap-5">
                    {/* Vertical connector */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold shadow-md z-10">
                        {step}
                      </div>
                      {i < PATHWAY_STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-navy-100 my-1" aria-hidden="true" />
                      )}
                    </div>
                    {/* Text */}
                    <div className="pb-7 last:pb-0">
                      <p className="font-display font-semibold text-navy text-base leading-none mb-1.5 mt-2">{label}</p>
                      <p className="text-muted text-sm leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 5. Our Values ─────────────────────────────────────────────────── */}
      <section className="section-padding bg-navy" aria-labelledby="values-heading">
        <div className="container-padded">
          <AnimatedSection className="text-center mb-14">
            <p className="eyebrow text-gold mb-3">What We Stand For</p>
            <h2 id="values-heading" className="heading-section text-white mb-4">
              Principles We Don&apos;t Compromise On
            </h2>
            <p className="text-navy-200 max-w-xl mx-auto leading-relaxed">
              These aren&apos;t aspirations pinned to a wall. They are operational standards that govern every decision
              we make.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {VALUES.map(({ Icon, title, description }) => (
              <StaggerItem key={title}>
                <article className="bg-navy-800 border border-navy-700 rounded-2xl p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-3">{title}</h3>
                  <p className="text-navy-300 text-sm leading-relaxed">{description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 6. More Than a Consultancy ────────────────────────────────────── */}
      <section className="section-padding bg-cream" aria-labelledby="partner-heading">
        <div className="container-padded">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <AnimatedSection>
              <p className="eyebrow mb-3">More Than a Consultancy</p>
              <h2 id="partner-heading" className="heading-section text-navy mb-6">
                We&apos;re Your Partner, Not Just Your Agent
              </h2>
              <div className="space-y-4 text-muted leading-relaxed text-[15px]">
                <p>
                  We maintain strong collaborations with accredited universities that meet international academic
                  standards — enabling students to pursue their education with confidence and full clarity.
                </p>
                <p>
                  Beyond academic placement, we focus on something deeper: fostering independence, cultural
                  adaptability, and the kind of long-term professional growth that defines a true global career.
                </p>
                <p>
                  At Edunest, we operate with a clear commitment to professionalism, ethical practices, and student
                  success. Our role is not limited to consultancy — we act as a long-term partner, supporting students
                  as they transition into global professionals.
                </p>
              </div>
            </AnimatedSection>

            {/* Feature cards */}
            <StaggerContainer className="flex flex-col gap-3">
              {PARTNER_FEATURES.map(({ Icon, label, desc }) => (
                <StaggerItem key={label}>
                  <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-navy" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm mb-0.5">{label}</p>
                      <p className="text-muted text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  );
}

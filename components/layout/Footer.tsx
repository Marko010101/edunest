import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Universities", href: "/universities" },
  { label: "Contact", href: "/contact" },
  { label: "Apply Now", href: "/contact#apply" },
];

const PROGRAM_LINKS = [
  { label: "MBBS in Georgia", href: "/universities?program=mbbs" },
  { label: "Business Programs", href: "/universities?program=business" },
  { label: "Engineering", href: "/universities?program=engineering" },
  { label: "Law", href: "/universities?program=law" },
];

const SOCIAL_LINKS = [
  { Icon: Instagram, href: "https://instagram.com/edunest", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com/edunest", label: "Facebook" },
  { Icon: Linkedin, href: "https://linkedin.com/company/edunest", label: "LinkedIn" },
  { Icon: Youtube, href: "https://youtube.com/@edunest", label: "YouTube" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white" aria-label="Site footer">
      <div className="container-padded">
        {/* ─── Main grid ─────────────────────────────────────── */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5" aria-label="Edunest home">
              <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center shadow-gold/30 shadow-md">
                <GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="font-display font-bold text-xl">Edunest</span>
            </Link>

            <p className="text-navy-200 text-sm leading-relaxed mb-7 max-w-sm">
              Bridging the gap between ambitious Indian students and world-class Georgian universities. Honest guidance.
              End-to-end support.
            </p>

            <address className="not-italic flex flex-col gap-3">
              <a
                href="mailto:info@edunest.in"
                className="flex items-center gap-2.5 text-sm text-navy-200 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                info@edunest.in
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2.5 text-sm text-navy-200 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                +91&nbsp;12345&nbsp;67890
              </a>
              <p className="flex items-start gap-2.5 text-sm text-navy-200">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                New Delhi &amp; Mumbai, India
              </p>
            </address>
          </div>

          {/* Company links */}
          <nav aria-label="Company links">
            <h3 className="font-semibold text-xs uppercase tracking-widest text-navy-300 mb-5">Company</h3>
            <ul className="flex flex-col gap-3" role="list">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-navy-200 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programs links */}
          <nav aria-label="Programs links">
            <h3 className="font-semibold text-xs uppercase tracking-widest text-navy-300 mb-5">Programs</h3>
            <ul className="flex flex-col gap-3" role="list">
              {PROGRAM_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-navy-200 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Trust block */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-navy-300 mb-5">Why Edunest</h3>
            <ul className="flex flex-col gap-3" role="list">
              {[
                "500+ Students Placed",
                "10+ Partner Universities",
                "NMC Approved Universities",
                "Free Counselling Sessions",
                "98% Visa Success Rate",
              ].map((item) => (
                <li key={item} className="text-sm text-navy-200 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Bottom bar ────────────────────────────────────── */}
        <div className="border-t border-navy-700 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-300 text-sm">&copy; {year} Edunest. All rights reserved.</p>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center text-navy-300 hover:bg-gold hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

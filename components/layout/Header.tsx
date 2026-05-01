"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/shared/Button";
import { EnquireButton } from "@/components/shared/EnquireButton";
import { cn } from "@/lib/utils";

// ─── Config — update these when contact details change ───────────────────────
const WA_DISPLAY = "+91 98765 43210";
const WA_LINK =
  "https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20studying%20in%20Georgia.";
const EMAIL_DISPLAY = "info@edunest.in";
const EMAIL_LINK = "mailto:info@edunest.in";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/universities", label: "Universities" },
  { href: "/contact", label: "Contact" },
] as const;

// Top-bar height in px — keep in sync with the h-10 class below
const TOP_BAR_H = 40;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const lightNav = !scrolled;

  return (
    <>
      {/* ── WhatsApp announcement bar ─────────────────────────────────────── */}
      <div className="fixed inset-x-0 top-0 z-50 h-10 bg-navy flex items-center" aria-label="Contact information">
        <div className="container-padded w-full flex items-center justify-center sm:justify-between gap-6">
          {/* Email us */}
          <a
            href={EMAIL_LINK}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs font-medium"
            aria-label={`Email us at ${EMAIL_DISPLAY}`}
          >
            <Mail className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Email us:</span>
            <span className="font-semibold">{EMAIL_DISPLAY}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs font-medium"
            aria-label={`Chat with us on WhatsApp: ${WA_DISPLAY}`}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="hidden sm:inline">Chat with us:</span>
            <span className="font-semibold">{WA_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* ── Main nav bar ──────────────────────────────────────────────────── */}
      {/*
        Sits directly below the top bar (top-10 = 40px).
        Becomes solid white once the user scrolls past 24px.
      */}
      <header
        className={cn(
          "fixed inset-x-0 z-40 transition-all duration-300",
          `top-[${TOP_BAR_H}px]`,
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent",
        )}
        style={{ top: TOP_BAR_H }} // inline fallback for the dynamic class
      >
        <nav className="container-padded flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Edunest home">
            <Image
              src="/logo.webp"
              alt="Edunest"
              width={140}
              height={40}
              className="h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Right side — Enquire Now + hamburger */}
          <div className="flex items-center gap-2">
            <EnquireButton variant={lightNav ? "ghost" : "primary"} size="sm" />

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={cn(
                "p-2.5 rounded-xl border transition-all duration-200",
                lightNav
                  ? "text-white border-white/20 hover:bg-white/10"
                  : "text-navy border-navy-100 hover:bg-navy-50",
              )}
              aria-label={menuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="nav-drawer"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Slide-in navigation drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-navy/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              id="nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-navy flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-20 border-b border-navy-700 flex-shrink-0">
                <Link
                  href="/"
                  className="flex items-center"
                  aria-label="Go to homepage"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src="/logo.webp" alt="Edunest" width={120} height={36} className="h-8 w-auto object-contain" />
                </Link>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg text-navy-300 hover:text-white hover:bg-navy-700 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Site pages">
                <ul className="flex flex-col gap-1" role="list">
                  {NAV_LINKS.map(({ href, label }, i) => {
                    const active = pathname === href;
                    return (
                      <motion.li
                        key={href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + i * 0.06, duration: 0.28, ease: "easeOut" }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-colors",
                            active
                              ? "text-white bg-navy-800 font-semibold"
                              : "text-navy-100 hover:text-white hover:bg-navy-800",
                          )}
                        >
                          {label}
                          {active && <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer footer — CTAs */}
              <div className="px-4 pb-8 pt-4 border-t border-navy-700 flex-shrink-0 flex flex-col gap-3">
                <EnquireButton
                  label="Get Free Counselling"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                />

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-navy-600 text-navy-100 hover:text-white hover:border-navy-400 text-sm font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp Us Directly
                </a>

                <p className="text-center text-navy-400 text-xs">{WA_DISPLAY}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

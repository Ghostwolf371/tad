"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { InstagramIcon, LinkedInIcon, FacebookIcon } from "./icons/Social";
import TadWordmark from "@/components/ui/TadWordmark";
import { services } from "@/data/services";
import { products } from "@/data/products";

const SERVICES = services.map((s) => ({
  label: s.heading,
  href: s.href,
}));

const PRODUCTS = [
  { label: "All products", href: "/products" },
  ...products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/vacature" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/tadsuriname/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/tad-sr/", Icon: LinkedInIcon },
  { label: "Facebook", href: "https://www.facebook.com/tad.sr", Icon: FacebookIcon },
];

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-canvas-green text-white">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-malachite/30 to-transparent" />

      <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-6 sm:py-20 lg:px-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link href="/" aria-label="TAD home" className="inline-flex w-fit items-center gap-3">
              <Image
                src="/brand/logomark.png"
                alt=""
                width={48}
                height={48}
                className="h-10 w-auto"
                unoptimized
              />
              <TadWordmark theme="dark" size="lg" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              A Suriname-based digital agency engineering next-gen products, brands and experiences. From now to next.
            </p>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 text-malachite group-hover:scale-110 transition" />
                <a href="tel:+5978925686" className="hover:text-white transition">+597 892-5686</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 text-malachite group-hover:scale-110 transition" />
                <a href="mailto:info@tad.sr" className="hover:text-white transition">info@tad.sr</a>
              </li>
              <li className="flex items-center gap-3 group">
                <MapPin className="h-4 w-4 text-malachite group-hover:scale-110 transition" />
                <span>Paramaribo, Suriname</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-10">
            <FooterCol title="Services" items={SERVICES} />
            <FooterCol title="Products" items={PRODUCTS} />
            <FooterCol title="Company" items={COMPANY} />
            <FooterCol title="Legal" items={LEGAL} />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-xs text-white/40 tracking-normal font-mono">
            © {new Date().getFullYear()} TAD N.V. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-malachite hover:border-malachite/40 hover:bg-white/5 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-malachite hover:border-malachite/40 hover:bg-white/5 transition"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-normal text-white/40 mb-5 font-mono">
        {title}
      </h4>
      <ul className="flex flex-col gap-3 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-white/70 hover:text-malachite transition inline-flex items-center gap-1 group"
            >
              <span className="opacity-0 group-hover:opacity-100 text-malachite text-xs transition-opacity font-mono">{">"}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

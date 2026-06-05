import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import DevServiceWorkerCleanup from "@/components/dev/DevServiceWorkerCleanup";
import WhatsAppRobot from "@/components/home/WhatsAppRobot";
import PageLoadGate from "@/components/skeletons/PageLoadGate";
import CookieConsent from "@/components/CookieConsent";
import LaunchScreen from "@/components/LaunchScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Brand wordmark only (tad.) — Montserrat Alternates */
const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tad.sr"),
  title: {
    default: "TAD — From Now to Next",
    template: "%s · TAD",
  },
  description:
    "TAD is a software development and service company headquartered in Paramaribo, Suriname. We build next-gen digital products and brands that empower businesses for tomorrow.",
  openGraph: {
    title: "TAD — From Now to Next",
    description:
      "A Suriname-based digital agency building world-class products, brands and experiences.",
    url: "https://tad.sr",
    siteName: "TAD",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TAD — From now to next.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAD — From Now to Next",
    description:
      "A Suriname-based digital agency building world-class products, brands and experiences.",
    images: ["/og/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${montserratAlternates.variable}`}
    >
      <head>
        {/* Decide BEFORE first paint whether the launch screen shows this session.
            Prevents the launcher from flashing on refresh once it's been seen, and
            hides page content from frame 1 for first-time visitors (no content flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var ua=navigator.userAgent||"";var isBot=/bot|crawl|spider|lighthouse|headless|pagespeed|gtmetrix|pingdom|prerender/i.test(ua);if(!isBot&&!sessionStorage.getItem('tad-launch-seen')){document.documentElement.classList.add('is-launching');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-swamp flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://tad.sr/#organization",
                  name: "TAD",
                  url: "https://tad.sr",
                  logo: "https://tad.sr/brand/logomark.png",
                  description:
                    "TAD is a software development and service company headquartered in Paramaribo, Suriname, building next-gen digital products and brands.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Paramaribo",
                    addressCountry: "SR",
                  },
                  sameAs: [
                    "https://www.facebook.com/tad.sr",
                    "https://www.instagram.com/tadsuriname/",
                    "https://www.linkedin.com/company/tad-sr/",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://tad.sr/#website",
                  url: "https://tad.sr",
                  name: "TAD",
                  publisher: { "@id": "https://tad.sr/#organization" },
                },
              ],
            }),
          }}
        />
        <DevServiceWorkerCleanup />
        <SmoothScroll />
        <NoiseOverlay />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 overflow-x-hidden">
          <PageLoadGate>{children}</PageLoadGate>
        </main>
        <Footer />
        <WhatsAppRobot />
        <CookieConsent />
        <LaunchScreen />
      </body>
    </html>
  );
}

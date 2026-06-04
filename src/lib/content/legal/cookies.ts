import type { LegalSection } from "./privacy";

export const cookiePolicy = {
  title: "Cookie Policy",
  intro:
    "This Cookie Policy explains how TAD (\"we\", \"us\", or \"our\") uses cookies and similar technologies when you visit https://www.tad.sr. By continuing to browse the site, you agree to our use of cookies as described in this policy.",
  sections: [
    {
      title: "What are cookies",
      paragraphs: [
        "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, understand how you use the site, and improve your experience.",
      ],
    },
    {
      title: "How we use cookies",
      paragraphs: ["We use cookies to:"],
      list: [
        "Keep the website functioning correctly",
        "Remember your preferences and settings",
        "Understand how visitors interact with our pages",
        "Measure the effectiveness of marketing campaigns",
        "Improve our products and services",
      ],
    },
    {
      title: "Types of cookies we use",
      paragraphs: [
        "Essential cookies are required for the website to work. Analytics cookies help us understand traffic and usage. Marketing cookies may be set by third-party partners such as Google to deliver relevant advertising.",
      ],
    },
    {
      title: "Third-party cookies",
      paragraphs: [
        "Some cookies are placed by third-party services that appear on our pages, including analytics and advertising providers. We do not control these cookies — please review the privacy policies of those providers for more information.",
      ],
    },
    {
      title: "Managing cookies",
      paragraphs: [
        "You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when a cookie is being sent. Disabling cookies may affect how certain parts of our website function.",
      ],
    },
    {
      title: "Contact us",
      paragraphs: [
        "If you have questions about our use of cookies, contact us at info@tad.sr or +597 892-5686.",
      ],
    },
  ] satisfies LegalSection[],
};

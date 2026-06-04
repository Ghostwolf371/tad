export const contactContent = {
  hero: {
    eyebrow: "Contact",
    titleLines: ["Let's talk", "about your project."] as const,
    titleGradientLine: 1,
    subtitle:
      "Tell us what you're building — or email us at info@tad.sr. We respond within one business day.",
  },
  form: {
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    message: "Tell us about your project",
    submit: "Submit",
    success: "Thanks — we'll get back to you within one business day.",
  },
} as const;

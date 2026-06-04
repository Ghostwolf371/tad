"use client";

import { useState, useEffect } from "react";
import { contactContent } from "@/lib/content/contact";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

type ContactFormProps = {
  className?: string;
};

export default function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCSRFToken() {
      try {
        const res = await fetch("/api/csrf");
        const data = await res.json();
        setCsrfToken(data.token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    }
    fetchCSRFToken();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, email, message, company } = values;
    const nextErrors: Record<string, string> = {};

    if (!name.trim()) nextErrors.name = "Name is required";
    if (!email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email";
    if (!message.trim()) nextErrors.message = "Please describe your project";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken || "",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setValues({ name: "", email: "", company: "", message: "" });
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00e357", "#01f2ad", "#ffffff"],
      });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border border-malachite/25 bg-malachite/10 px-6 py-12 text-center",
          className,
        )}
      >
        <p className="text-lg font-semibold text-swamp">{contactContent.form.success}</p>
        <p className="mt-2 text-sm text-swamp/60">We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-lg border border-swamp/15 bg-white px-4 py-2.5 text-sm text-swamp outline-none transition neon-focus";

  const labelClass = "text-sm font-medium text-swamp/80";

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className={labelClass}>
            {contactContent.form.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues((p) => ({ ...p, name: e.target.value }))}
            className={fieldClass}
          />
          {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className={labelClass}>
            {contactContent.form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((p) => ({ ...p, email: e.target.value }))}
            className={fieldClass}
          />
          {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="company" className={labelClass}>
          {contactContent.form.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => setValues((p) => ({ ...p, company: e.target.value }))}
          className={fieldClass}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className={labelClass}>
          {contactContent.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((p) => ({ ...p, message: e.target.value }))}
          className={cn(fieldClass, "resize-y min-h-[8.5rem]")}
        />
        {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please email us at info@tad.sr instead.
        </p>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={status === "loading"}
          isLoading={status === "loading"}
        >
          {contactContent.form.submit}
        </Button>
      </div>
    </form>
  );
}

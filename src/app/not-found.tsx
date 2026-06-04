import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center section-hero-tint py-24">
      <div className="relative z-[2] mx-auto max-w-md px-6 text-center">
        <span className="label-tech text-malachite-700">404</span>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal text-swamp sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-swamp/75">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <ButtonLink href="/" variant="primary" size="lg">
            Go back home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

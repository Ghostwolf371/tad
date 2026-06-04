export default function ThemeSparkle({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`shrink-0 text-malachite-700 ${className}`}
      aria-hidden
    >
      <path d="M12 2l1.8 6.2L20 12l-6.2 1.8L12 20l-1.8-6.2L4 12l6.2-1.8L12 2z" />
    </svg>
  );
}

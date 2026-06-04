import Link from "next/link";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-normal transition-[background-color,border-color,color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malachite/60 focus-visible:ring-offset-2 focus-visible:ring-offset-swamp disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap relative overflow-hidden active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-malachite text-swamp hover:bg-spring hover:-translate-y-0.5 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] btn-shimmer",
        outline:
          "border border-swamp/15 text-swamp bg-white hover:border-malachite-700/50 hover:text-malachite-700 hover:shadow-[0_0_0_1px_rgba(0,227,87,0.2)]",
        ghost:
          "text-swamp/70 hover:text-swamp",
        subtle:
          "bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.07] hover:border-white/20",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & { asChild?: never; isLoading?: boolean };

export function Button({ className, variant, size, isLoading, children, ...props }: ButtonProps) {
  return (
    <button className={cn(button({ variant, size }), className)} {...props}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof button>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(button({ variant, size }), className)} {...props} />;
}

export { button as buttonVariants };

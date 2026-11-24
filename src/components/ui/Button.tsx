import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "yellow" | "white" | "black" | "ghost";
type ButtonSize = "md" | "sm";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  yellow:
    "bg-brand-yellow text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)]",
  white: "bg-white text-black",
  black: "bg-black text-white",
  ghost: "px-5 py-3 text-[14px] text-white",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "gap-2 px-6 py-[14px] text-[16px]",
  sm: "gap-1 px-5 py-3 text-[14px]",
};

export function Button({
  variant,
  size = "md",
  className = "",
  href,
  children,
  ...props
}: ButtonProps) {
  const sizeClass = variant === "ghost" ? "gap-2" : SIZE_CLASSES[size];
  const combinedClassName =
    `flex items-center justify-center rounded-full font-medium leading-[18px] tracking-[-0.02em] whitespace-nowrap transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98] ${sizeClass} ${VARIANT_CLASSES[variant]} ${className}`.trim();

  if (href && href.startsWith("/")) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={combinedClassName} {...props}>
      {children}
    </a>
  );
}

import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  light?: boolean;
  className?: string;
}

export function Eyebrow({
  children,
  light = false,
  className = "",
}: EyebrowProps) {
  return (
    <p
      className={`flex items-center gap-[6px] font-label font-semibold leading-[1.1] ${
        light
          ? "text-[15px] text-white sm:text-[18px]"
          : "text-[14px] text-black sm:text-[16px]"
      } ${className}`.trim()}
    >
      <span className="inline-flex shrink-0">
        <img
          src={light ? "/assets/eyebrow-a-w.svg" : "/assets/eyebrow-a.svg"}
          alt=""
        />
        <img
          src={light ? "/assets/eyebrow-b-w.svg" : "/assets/eyebrow-b.svg"}
          alt=""
        />
      </span>
      {children}
    </p>
  );
}

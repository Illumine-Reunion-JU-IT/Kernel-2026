"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
  /** Renders a non-interactive, aria-disabled control (e.g. registration before the URL exists). */
  disabled?: boolean;
  magnetic?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  "aria-label"?: string;
  "data-cursor"?: string;
}

const variantClass: Record<Variant, string> = {
  primary: "kbtn kbtn-primary",
  secondary: "kbtn kbtn-secondary",
  text: "kbtn kbtn-text"
};

/** One button for the whole site: shard silhouette, wipe fill on hover, optional magnetic pull. */
export function Button({ children, variant = "primary", href, external, disabled, magnetic = true, className, onClick, type = "button", ...rest }: ButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || disabled || variant === "text") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.28);
      qy((e.clientY - (r.top + r.height / 2)) * 0.34);
    };
    const reset = () => { qx(0); qy(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); };
  }, [magnetic, disabled, variant]);

  const cls = cn(variantClass[variant], className);
  const inner = <span className="kbtn-label">{children}</span>;

  if (disabled) {
    return <span ref={ref as React.Ref<HTMLSpanElement>} role="link" aria-disabled="true" className={cls}>{inner}</span>;
  }
  if (href && external) {
    return <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>{inner}</a>;
  }
  if (href) {
    return <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} onClick={onClick} {...rest}>{inner}</Link>;
  }
  return <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={cls} onClick={onClick} {...rest}>{inner}</button>;
}

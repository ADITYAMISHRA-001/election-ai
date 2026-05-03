import * as React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-civic-blue disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-civic-blue text-white hover:bg-blue-800 shadow-sm": variant === "primary",
            "bg-blue-50 text-civic-blue hover:bg-blue-100": variant === "secondary",
            "border-2 border-slate-200 bg-transparent hover:border-civic-blue hover:text-civic-blue text-slate-700": variant === "outline",
            "bg-transparent hover:bg-slate-100 text-slate-700": variant === "ghost",
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
            "h-11 w-11": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

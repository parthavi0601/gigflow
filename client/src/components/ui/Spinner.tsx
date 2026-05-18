import type { CSSProperties } from "react";
import { cn } from "../../utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
}

export const Spinner = ({ size = "md", className, style }: SpinnerProps) => (
  <div
    className={cn("spinner", `spinner-${size}`, className)}
    style={style}
    role="status"
    aria-label="Loading"
  />
);

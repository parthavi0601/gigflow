import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card = ({ children, className, hoverable }: CardProps) => (
  <div className={cn("card", hoverable && "card-hover", className)}>
    {children}
  </div>
);

import type { JSX, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { NavLink } from "react-router";
export const variants = {
  primary:
    "bg-primary hover:bg-primary-light transition border-none text-white dark:text-gray-900",
  success:
    "bg-success hover:bg-success-light transition border-none text-white dark:text-gray-900",
  error:
    "bg-error hover:bg-error-light transition border-none text-white dark:text-gray-900",
};
const basesClass =
  "border cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:text-zinc-800";
const sizes = {
  md: "text-sm py-2 px-4 rounded-md",
};

type ButtonProps = {
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...buttonProps
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`${basesClass} ${sizes[size]} ${variants[variant]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
type ButtonLinkProps = {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
export const ButtonLink = ({
  href,
  children,
  size = "md",
  variant = "primary",
  ...anchorProps
}: ButtonLinkProps) => {
  return (
    <NavLink
      className={`${basesClass} ${sizes[size]} ${variants[variant]}`}
      {...anchorProps}
      to={href}
    >
      {children}
    </NavLink>
  );
};

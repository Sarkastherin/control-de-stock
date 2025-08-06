import type { ReactElement, ReactNode } from "react";
import { NavLink } from "react-router";
export const AnchorLink = ({
  text,
  href,
  labelLink,
}: {
  text: string;
  href: string;
  labelLink: string | ReactElement | ReactNode;
}) => {
  return (
    <p className="text-sm text-center">
      {text}{" "}
      <NavLink
        to={href}
        className="font-semibold text-primary hover:underline"
      >
        {labelLink}
      </NavLink>
    </p>
  );
};

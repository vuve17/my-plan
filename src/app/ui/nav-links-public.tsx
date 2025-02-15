"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import { navLinksStyle } from "../utils";

interface navLinksProps {
  onClick: () => void;
}

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Register",
    href: "/register",
  },
  {
    name: "Log in",
    href: "/login",
  },
];

const NavLinksPublic: React.FC<navLinksProps> = ({ onClick }) => {
  return (
    <Box
      sx={{
        padding: "3em",
      }}
    >
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClick}
            style={{
              ...navLinksStyle,
            }}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </Box>
  );
};

export default NavLinksPublic;

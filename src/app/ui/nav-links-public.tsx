'use client'

import Link from 'next/link';
import { Box } from '@mui/material';
import { navLinksStyle } from '../utils';

interface navLinksProps {
  onClick: () => void
}

const links = [
    { 
        name: 'Home', 
        href: '/' 
    },
    {
        name: 'About',
        href: '/about',
    },
    { 
        name: 'Register', 
        href: '/register', 
    },
    { 
        name: 'Log in', 
        href: '/login', 
    }
];


const  NavLinksPublic: React.FC<navLinksProps> = ({onClick}) => {
    return (
      <Box
      sx={{
        padding: "3em"
      }}
      >
        {links.map((link) => {
          return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClick}
                  style={{
                    ...navLinksStyle
                  }} 
                >
                  <p>{link.name}</p>
                </Link>
          );
        })}
      </Box>
    );
  }

export default NavLinksPublic
  
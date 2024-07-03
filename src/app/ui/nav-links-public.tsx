'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';


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
      <ul>
        {links.map((link) => {
          return (
            <li key={link.name}>
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClick}
                >
                  <p className="md:block">{link.name}</p>
                </Link>
            </li>
          );
        })}
      </ul>
    );
  }

export default NavLinksPublic
  
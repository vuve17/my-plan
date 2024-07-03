'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface navLinksProps {
  onClick: () => void
}

const links = [
    { 
        name: 'Achievements', 
        href: '/scheduler/achievements' 
    },
    {
        name: 'Statistics',
        href: '/scheduler/statistics',
    },
  ];


const  NavLinksPrivate: React.FC<navLinksProps> = ({onClick}) => {
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

export default NavLinksPrivate
  
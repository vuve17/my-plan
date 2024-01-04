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
        name: 'about',
        href: '/about',
    },
    { 
        name: 'register', 
        href: '/register', 
    },
    { 
        name: 'login', 
        href: '/login', 
    }
  ];


const  NavLinks: React.FC<navLinksProps> = ({onClick}) => {
    const pathname = usePathname();
    return (
      <ul>
        {links.map((link) => {
          return (
            <li key={link.name}>
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClick}
                //   style={}
                //   className={clsx(
                //     'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                //     {
                //       'bg-sky-100 text-blue-600': pathname === link.href,
                //     },
                //   )}
                >
                  <p className="hidden md:block">{link.name}</p>
                </Link>
            </li>
          );
        })}
      </ul>
    );
  }

export default NavLinks
  
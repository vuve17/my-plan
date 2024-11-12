'use client'

import Link from 'next/link';
import { Box } from '@mui/material';
import { navLinksStyle } from '../utils';

interface navLinksProps {
  onClick: () => void
  
}

async function logout() {
  try {
      const response = await fetch('/api/logout', {
          method: 'POST',
          credentials: 'include'
      });

      if (response.ok) {
          console.log('Logged out successfully');
          window.location.href = '/login';
      } else {
          const data = await response.json();
          console.error('Logout failed:', data.message);
      }
  } catch (error) {
      console.error('Error during logout:', error);
  }
}

const links = [
    { 
        name: 'Scheduler', 
        href: '/scheduler' 
    },
    { 
        name: 'Achievements', 
        href: '/scheduler/achievements' 
    },
  ];


const  NavLinksPrivate: React.FC<navLinksProps> = ({onClick}) => {
    return (
      <Box
      sx={{
        padding: "3em"
      }}
      >
        <Link
          key="logout"
          href='/login'
          onClick={() => logout()}
          style={{
            ...navLinksStyle
          }}
        >
          <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          >
            {`Log out `}
            <img src="../svg/log-out.svg" alt="log out icon" style={{marginLeft: "8px"}}/>
          </Box>
        </Link>

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
                  <p >{link.name}</p>
                </Link>
          );
        })}
      </Box>
    );
  }

export default NavLinksPrivate
  
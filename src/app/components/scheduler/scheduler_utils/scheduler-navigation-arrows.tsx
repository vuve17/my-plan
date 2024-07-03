import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { Box, Button, IconButton } from '@mui/material';
import colors from '@/app/ui/colors';
import { PropaneSharp } from '@mui/icons-material';

interface ArrowProps {
  height?: string | number;
  onClick?: () => void;
  hidden?: boolean;
  color?: string;
}

const NextArrowIcon: React.FC<ArrowProps> = ({ color, height, onClick, hidden }) => (
  <Button
    sx={{
      rotate: '-90deg',
      color: color || 'inherit',
      display: hidden ? 'none' : 'block',
      cursor: onClick ? 'pointer' : 'default',
      outline: 'none', 
      height: height,
      "&:hover": {
        backgroundColor: "transparent"
      }
    }}
    onClick={onClick}
    disableRipple
  >
    <svg width="20" height={height || 20} viewBox="0 0 20 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19.6083 0.411973C20.1306 0.959395 20.1306 1.84197 19.6083 2.3894L10.7514 11.6732C10.3357 12.1089 9.66427 12.1089 9.2486 11.6732L0.391687 2.3894C-0.130562 1.84197 -0.130562 0.959395 0.391687 0.411973C0.913937 -0.135448 1.75593 -0.135448 2.27818 0.411973L10.0053 8.50041L17.7325 0.400804C18.2441 -0.135447 19.0967 -0.135448 19.6083 0.411973Z" 
    fill={color || colors.primaryBlue}/>
    </svg>
  </Button>
);

const PreviousArrowIcon: React.FC<ArrowProps> = ({ color, height, onClick, hidden }) => (
  <Button
    sx={{
      rotate: '-90deg',
      color: color || 'inherit',
      display: hidden ? 'none' : 'block',
      cursor: onClick ? 'pointer' : 'default',
      outline: 'none', 
      height: height,
      "&:hover": {
        backgroundColor: "transparent"
      }
    }}
    onClick={onClick}
    disableRipple
  >
        <svg width="20" height={height || 20} viewBox="0 0 20 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M19.6083 11.588C20.1306 11.0406 20.1306 10.158 19.6083 9.6106L10.7514 0.326777C10.3357 -0.108926 9.66427 -0.108926 9.2486 0.326777L0.391687 9.6106C-0.130562 10.158 -0.130562 11.0406 0.391687 11.588C0.913937 12.1354 1.75593 12.1354 2.27818 11.588L10.0053 3.49959L17.7325 11.5992C18.2441 12.1354 19.0967 12.1354 19.6083 11.588Z"
        fill={color || colors.primaryBlue}/>
        </svg>
        
  </Button>
);

export const NextArrow: React.FC<ArrowProps> = (props) => <NextArrowIcon {...props} />;
export const PreviousArrow: React.FC<ArrowProps> = (props) => <PreviousArrowIcon {...props} />;

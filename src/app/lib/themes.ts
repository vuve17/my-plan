import { createTheme, ThemeProvider, styled, withStyles} from '@mui/material/styles';
import colors from '../ui/colors';

export  const CancelButtonStyle = createTheme({
    palette: {
      primary: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });
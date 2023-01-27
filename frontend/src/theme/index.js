import { extendTheme } from '@chakra-ui/react';
import COLORS from './_colors.scss';

const theme = extendTheme({
  fontSizes: {
    base: '60%',
    sm: '75%',
    md: '90%',
    lg: '200%',
    xl: '250%',
  },
  fonts: {
    body: 'Nexa, sans-serif',
    heading: 'Nexa, sans-serif',
    mono: 'Nexa, sans-serif',
  },
  colors: {
    primary: {
      // define all the color's shades to use it as a component's colorScheme
      100: COLORS.primary,
      200: COLORS.primary,
      300: COLORS.primary,
      400: COLORS.primary,
      500: COLORS.primary,
      600: COLORS.primaryDark,
      700: COLORS.primaryDark,
      800: COLORS.primaryDark,
      900: COLORS.primaryDark,
    },
    secondary: {
      300: COLORS.secondary,
      500: COLORS.secondaryDark,
    },
    white: {
      300: COLORS.white,
    },
    black: {
      100: COLORS.black,
      200: COLORS.black,
      300: COLORS.black,
      400: COLORS.black,
      500: COLORS.black,
      600: COLORS.black,
      700: COLORS.black,
      800: COLORS.black,
      900: COLORS.black,
    },
    grey: {
      100: COLORS.grey,
      500: COLORS.greyMedium,
      900: COLORS.greyDark,
    },
  },
});

export default theme;

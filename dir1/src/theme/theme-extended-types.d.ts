import '@mui/material/styles';

import '@mui/material/styles/createPalette';

import '@mui/material/Typography';

import '@mui/material/Avatar';

import '@mui/material/Badge';

import '@mui/material/IconButton';

import '@mui/material/Chip';


import React from 'react';


declare module '@mui/material/styles' {

  interface BreakpointOverrides {

    xs: true;

    sm: true;

    md: true;

    lg: true;

    xl: true;

    xxl: true;

  }


  interface Palette {

    tertiary: Palette['primary'];

    text: Palette['primary'];

  }


  interface PaletteOptions {

    tertiary: PaletteOptions['primary'];

    text: PaletteOptions['primary'];

  }


  interface PaletteColor {

    highlight?: string;

  }


  interface SimplePaletteColorOptions {

    highlight?: string;

  }


  interface TypeBackground {

    light?: string;

  }


  interface TypographyVariants {

    extra: React.CSSProperties;

    h1: React.CSSProperties;

    h2: React.CSSProperties;

    h3: React.CSSProperties;

    h4: React.CSSProperties;

    section: React.CSSProperties;

    subtitle: React.CSSProperties;

    label: React.CSSProperties;

    body: React.CSSProperties;

    body1: React.CSSProperties;

    paragraph: React.CSSProperties;

    small: React.CSSProperties;

    button: React.CSSProperties;

    buttonSmall: React.CSSProperties;

    tiny: React.CSSProperties;

  }


  // Allow configuration using `createTheme`

  interface TypographyVariantsOptions {

    extra?: React.CSSProperties;

    h1?: React.CSSProperties;

    h2?: React.CSSProperties;

    h3?: React.CSSProperties;

    h4?: React.CSSProperties;

    section?: React.CSSProperties;

    subtitle?: React.CSSProperties;

    label?: React.CSSProperties;

    body?: React.CSSProperties;

    body1?: React.CSSProperties;

    paragraph?: React.CSSProperties;

    small?: React.CSSProperties;

    button?: React.CSSProperties;

    buttonSmall?: React.CSSProperties;

    tiny?: React.CSSProperties;

  }

}


declare module '@mui/material/styles/createPalette' {

  interface Palette {

    tertiary: PaletteColor;

    outlineBorder: string;

    backdropOverlay: string;

  }


  interface PaletteOptions {

    tertiary?: PaletteColorOptions;

    outlineBorder?: string;

    backdropOverlay?: string;

  }

}


// Update the Typography's variant prop options

declare module '@mui/material/Typography' {

  interface TypographyPropsVariantOverrides {

    extra: true;

    h1: true;

    h2: true;

    h3: true;

    h4: false;

    section: true;

    subtitle: true;

    label: true;

    body: true;

    body1: true;

    paragraph: true;

    small: true;

    button: true;

    buttonSmall: true;

    tiny: true;

  }

}


declare module '@mui/material/Icon' {

  interface IconPropsColorOverrides {

    tertiary: true;

    text: true;

  }


  interface IconPropsSizeOverrides {

    tiny: true;

  }

}


declare module '@mui/material/Badge' {

  interface BadgePropsColorOverrides {

    tertiary: true;

    text: true;

  }

}


declare module '@mui/material/Chip' {

  interface ChipPropsColorOverrides {

    tertiary: true;

    text: true;

  }

}


declare module '@mui/material/IconButton' {

  interface IconButtonPropsColorOverrides {

    tertiary: true;

    default: false;

    error: false;

    info: false;

    success: false;

    warning: false;

  }


  interface IconButtonPropsSizeOverrides {

    large: false;

    medium: false;

    normal: true;

  }

}

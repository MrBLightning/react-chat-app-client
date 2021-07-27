import { COLORS, SIZES } from './appConsts';

export default (theme) => {
  theme.typography.h1 = {
    // Header
    fontFamily: 'Raleway',
    color: COLORS.BLACK,
    fontWeight: 600,
    fontSize: 40,
    [theme.breakpoints.down('sm')]: {
      fontWeight: 700,
      fontSize: 22,
    },
  };

  theme.typography.h2 = {
    // SubHeader
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    fontWeight: 400,
    fontSize: 25,
    [theme.breakpoints.down('sm')]: {
      fontWeight: 500,
      fontSize: 18,
    },
  };

  theme.typography.button = {
    // CTA
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    fontWeight: 600,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontWeight: 500,
      fontSize: 16,
    },
  };

  theme.typography.body1 = {
    // Paragraph
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    fontWeight: 400,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  };

  theme.typography.subtitle1 = {
    // Label1
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    fontWeight: 500,
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  };
  theme.typography.subtitle2 = {
    // Label2
    fontFamily: 'Poppins',
    color: COLORS.BLACK,
    fontWeight: 300,
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  };
  // theme.typography.subtitle2 = {
  //   // Tag
  //   fontFamily: 'Noto Sans',
  //   color: COLORS.BLACK,
  //   fontWeight: '600',
  //   fontSize: 16,
  //   [theme.breakpoints.down('sm')]: {
  //     fontWeight: '500',
  //     fontSize: 14,
  //   },
  // };
  // theme.typography.body2 = {
  //   // XSParagraph
  //   fontFamily: 'Noto Sans',
  //   color: COLORS.BLACK,
  //   fontWeight: '400',
  //   fontSize: 16,
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: 12,
  //   },
  // };

  theme.typography.caption = {
    // Link
    fontFamily: 'Poppins',
    textDecoration: 'underline',
    color: COLORS.BLACK,
    fontWeight: 500,
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  };
  theme.typography.body2 = {
    // PresentType
    fontFamily: 'Kalam',
    color: COLORS.BLACK,
    fontWeight: 400,
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  };

  theme.overrides = {
    MuiButton: {
      root: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: '100px',
        fontSize: 18,
        width: 378,
        padding: `${SIZES.m - 2}px ${SIZES.l}px`,
        minHeight: 60, // for safari mobile small screen
        [theme.breakpoints.down('sm')]: {
          fontSize: 16,
          width: 'unset',
          fontWeight: 500,
          minWidth: 195,
          maxWidth: 300,
        },
      },
    },
  };

  return theme;
};

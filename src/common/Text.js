import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Input } from '@material-ui/core';
import { COLORS, SIZES } from '../styles/appConsts';
/**
 * All Text components can receive also color and fontWeight as props and not neccesary in class or style
 */
const CustomText = (props) => {
  const { children, color, fontWeight, m, mt, mb, mx, my, mr, ml, style = {} } = props;
  const margin = {
    marginTop: m || my || mt,
    marginBottom: m || my || mb,
    marginLeft: m || mx || ml,
    marginRight: m || mx || mr,
  };
  const textProps = { ...props, color: undefined, fontWeight: undefined };
  return (
    <Typography {...textProps} style={{ color, fontWeight, ...margin, ...style }}>
      {children}
    </Typography>
  );
};

export const Header = (props) => {
  const { children } = props;
  return (
    <CustomText {...props} variant='h1'>
      {children}
    </CustomText>
  );
};

export const SubHeader = (props) => {
  const { children } = props;
  return (
    <CustomText {...props} variant='h2'>
      {children}
    </CustomText>
  );
};

export const CTA = (props) => {
  const { children } = props;
  return (
    <CustomText {...props} variant='button'>
      {children}
    </CustomText>
  );
};

export const Paragraph = (props) => {
  const { children } = props;
  return (
    <CustomText {...props} variant='body1'>
      {children}
    </CustomText>
  );
};

export const Label1 = (props) => {
  const { children } = props;
  return (
    <CustomText {...props} variant='subtitle1'>
      {children}
    </CustomText>
  );
};
export const Label2 = (props) => {
  const { children } = props;
  return (
    <CustomText {...props} variant='subtitle2'>
      {children}
    </CustomText>
  );
};

// export const Tag = (props) => {
//   const { children } = props;
//   return (
//     <CustomText {...props} variant='subtitle2'>
//       {children}
//     </CustomText>
//   );
// };

// export const XSParagraph = (props) => {
//   const { children } = props;
//   return (
//     <CustomText {...props} variant='body2'>
//       {children}
//     </CustomText>
//   );
// };

export const Link = (props) => {
  const { children } = props;
  return (
    <CustomText {...props} variant='caption'>
      {children}
    </CustomText>
  );
};
export const PresentType = (props) => {
  const { children } = props;
  return (
    <CustomText {...props} variant='body2'>
      {children}
    </CustomText>
  );
};

// Input Text
const inputTextStyles = (theme) => ({
  inputDiv: {
    background: COLORS.GRAY_50,
    borderRadius: 8,
    height: '100%',
    width: '100%',
    padding: SIZES.s,
    textAlign: 'left',
    overflow: 'auto',
  },
  input: {
    fontFamily: 'Noto Sans',
    color: COLORS.BLACK,
    width: '100%',
    fontSize: 18,
    lineHeight: '25px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },
});

/**
 * the height of this input is set in the wrapper component, this one take it from there.
 * so need to wrap it with wrapper component which will have a determine height
 * be notice on all the 'default' props (autoFocus, etc.), they can be override
 */
export const InputText = withStyles(inputTextStyles)((props) => {
  const { classes, wrapperClass, ...rest } = props;
  const wrapper = wrapperClass || classes.inputDiv
  return (
    <div className={wrapper}>
      <Input
        className={classes.input}
        autoFocus
        multiline
        disableUnderline
        placeholder='Type here...'
        {...rest}
      />
    </div>
  );
});

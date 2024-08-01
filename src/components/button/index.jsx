import React from 'react';
import { StyledButton } from './style';
import { CircularProgress } from '@mui/material';

/**
 * CustomButton Component
 *
 * @param {string} text - The text content of the button.
 * @param {string} tColor - Text color for the button.
 * @param {Object} sxProps - Custom styling properties for the button.
 * @param {boolean} loading - Flag indicating whether the button is in a loading state.
 * @param {string} type - The type of the button (e.g., 'button', 'submit', 'reset').
 * @param {boolean} disabled - Flag indicating whether the button is disabled.
 * @param {ReactNode} startIcon - Icon element to be displayed at the start of the button.
 * @param {function} clicked - Callback function to be executed on button click.
 * @param {string} variant - The visual style of the button ('contained', 'outlined', etc.).
 * @param {Object} rest - Additional props to be spread onto the button element.
 *
 * @example
 * // Example usage of CustomButton component
 * <CustomButton
 *   text="Click me"
 *   tColor="#ffffff"
 *   sxProps={{ bg: '#3498db' }}
 *   loading={false}
 *   type="button"
 *   disabled={false}
 *   startIcon={<IconComponent />}
 *   clicked={() => console.log('Button clicked!')}
 *   variant="contained"
 *   additionalProp="additionalValue"
 * />
 */
const CustomButton = ({
  text,
  tColor,
  sxProps,
  loading = false,
  type = 'button',
  disabled = false,
  startIcon = null,
  clicked = () => {},
  variant = 'contained',
  ...rest
}) => {
  const isOutlined = variant === 'outlined';

  return (
    <StyledButton
      {...rest}
      type={type}
      tColor={tColor}
      onClick={clicked}
      loading={loading}
      sx={{
        ...sxProps,
        background: `${isOutlined ? 'transparent' : sxProps.bg}`,
        '&:hover': {
          boxShadow: 'unset',
          background: `${isOutlined ? 'transparent' : sxProps.bg}`
        }
      }}
      variant={variant}
      disabled={disabled}
      startIcon={startIcon}
      isOutlined={isOutlined}
    >
      {loading ? <CircularProgress size={22} color="inherit" /> : text}
    </StyledButton>
  );
};

export default CustomButton;

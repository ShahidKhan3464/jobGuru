import React from 'react';
import { customColors } from 'theme/pallete';
import { StyledFormLabel } from 'styles/global';
import { MuiOtpInput } from 'mui-one-time-password-input';

const OTPVerification = ({
  rest,
  label,
  value,
  field,
  onChange,
  disabled = false
}) => {
  return (
    <React.Fragment>
      {label && <StyledFormLabel>{label}</StyledFormLabel>}
      <MuiOtpInput
        gap="6px"
        {...rest}
        length={6}
        {...field}
        value={value}
        sx={{ mt: '6px' }}
        onChange={onChange}
        autoFocus={!disabled}
        TextFieldsProps={{
          size: 'small',
          placeholder: '0',
          sx: {
            '& .MuiInputBase-root': {
              height: '48px',
              maxWidth: '78px',
              borderRadius: '12px',
              background: customColors.white,
              border: `1px solid ${customColors.grey}`,

              '& input': {
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                fontStyle: 'normal',
                color: `${customColors.black}`,
                fontFamily: 'Plus Jakarta Sans'
              },

              '& fieldset': {
                display: 'none'
              }
            }
          }
        }}
      />
    </React.Fragment>
  );
};

export default OTPVerification;

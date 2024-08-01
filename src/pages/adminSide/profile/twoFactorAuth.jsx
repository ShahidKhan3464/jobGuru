import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Box } from '@mui/material';
import { secondary } from 'theme/pallete';
import { enqueueSnackbar } from 'notistack';
import { customColors } from 'theme/pallete';
import TextField from 'components/textField';
import CustomButton from 'components/button';
import { FieldErrorMessage } from 'styles/global';
import { Field, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IOSSwitch, StyledTwoFactorAuth } from './style';
import OTPVerificationField from 'components/otpVerification';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  resendOtp,
  enableTwoFactor,
  otpVerification
} from 'provider/features/auth/auth.slice';

const TwoFactorAuth = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile.viewProfile);
  const [isTwoFactor, setIsTwoFactor] = useState(data?.isTwoFactorEnable);
  const { isLoading } = useSelector((state) => state.auth.otpVerification);

  const EnableTwoFactor = (e) => {
    setIsTwoFactor((prevState) => !prevState);
    dispatch(
      enableTwoFactor({
        payload: { is2faEnable: e.target.checked }
      })
    );
  };

  return (
    <StyledTwoFactorAuth>
      <div className="top">
        <h3 className="top_title">Two - Factor Authentication</h3>
        <IOSSwitch checked={isTwoFactor} onChange={EnableTwoFactor} />
      </div>
      <p className="subtitle">
        Two factor authentication provides extra protection for your account by
        requiring a special code
      </p>
      <div className="key-points">
        <ul>
          <li>
            Activating this toggle button will enable your two-factor
            authentication.
          </li>
          <li>The system will send a 6-digit OTP to your email.</li>
          <li>
            Upon entering the OTP, your account will be two-factor
            authenticated.{' '}
            <LockOutlinedIcon
              sx={{ fontSize: '18px', color: secondary.main }}
            />
          </li>
          <li>
            After each login, a unique 6-digit OTP will be sent to your email.
          </li>
          <li>Entering the OTP will allow you to log in.</li>
        </ul>
      </div>
      <Formik
        initialValues={{ otpCode: '' }}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) =>
          dispatch(
            otpVerification({
              payload: data,
              successCallback: () => {
                resetForm();
                enqueueSnackbar(
                  <div
                    style={{
                      gap: '8px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>
                      Two Factor Authentication Is On
                    </span>
                    <span>
                      Now whenever you sign in, OTP
                      <p>code shall be sent to your email</p>
                    </span>
                  </div>,
                  { variant: 'success' }
                );
              }
            })
          )
        }
      >
        {(formik) => {
          return (
            <Form
              noValidate
              name="basic"
              autoComplete="off"
              onFinish={formik.handleSubmit}
            >
              <div className="field-control">
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      type="email"
                      label="Email"
                      disabled={true}
                      field={{ ...field }}
                      value={data?.email || ''}
                    />
                  )}
                </Field>
              </div>

              <Box
                sx={{
                  pt: 3,
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                <div className="field-control">
                  <Field name="otpCode">
                    {({ field }) => (
                      <React.Fragment>
                        <OTPVerificationField
                          disabled={true}
                          field={{ ...field }}
                          label="Enter OTP here"
                          value={formik.values.otpCode}
                          error={
                            formik.errors.otpCode && formik.touched.otpCode
                          }
                          onChange={(value) =>
                            formik.setFieldValue('otpCode', value)
                          }
                        />
                        <ErrorMessage
                          name={field.name}
                          component={FieldErrorMessage}
                        />
                      </React.Fragment>
                    )}
                  </Field>
                </div>
                <span
                  className="resend-otp"
                  onClick={() => dispatch(resendOtp())}
                  style={{
                    pointerEvents: isTwoFactor ? 'auto' : 'none',
                    color: isTwoFactor ? secondary.main : customColors.grey
                  }}
                >
                  Resend OTP
                </span>
              </Box>

              <Box
                sx={{
                  pt: 3,
                  gap: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  '& > button': {
                    width: '150px'
                  },

                  '@media screen and (max-width: 520px)': {
                    justifyContent: 'center'
                  }
                }}
              >
                <CustomButton
                  type="submit"
                  text="Verify"
                  loading={isLoading}
                  disabled={!isTwoFactor}
                  sxProps={{
                    height: '44px',
                    fontWeight: 600,
                    fontSize: '16px',
                    bg: `${customColors.lightBlue}`
                  }}
                />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </StyledTwoFactorAuth>
  );
};

export default TwoFactorAuth;
// Validation schema for form fields using Yup
const validationSchema = Yup.object({
  otpCode: Yup.string().required('Otp is required')
});

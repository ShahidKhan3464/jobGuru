import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Box } from '@mui/material';
import { primary } from 'theme/pallete';
import CustomButton from 'components/button';
import { FieldErrorMessage } from 'styles/global';
import { Formik, Field, ErrorMessage } from 'formik';
import StyledAuthWrapper from 'components/authWrapper';
import { useDispatch, useSelector } from 'react-redux';
import OTPVerificationField from 'components/otpVerification';
import { resendOtp, otpVerification } from 'provider/features/auth/auth.slice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth.otpVerification);

  useEffect(() => {
    dispatch(resendOtp());
  }, [dispatch]);

  return (
    <StyledAuthWrapper subtitle="Please enter your 6-digit authentication code">
      <Formik
        initialValues={{ otpCode: '' }}
        validationSchema={validationSchema}
        onSubmit={(data) =>
          dispatch(
            otpVerification({
              payload: data,
              successCallback: () => {
                window.location.href = 'dashboard';
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
              <div className="field-control" style={{ paddingBottom: '24px' }}>
                <Field name="otpCode">
                  {({ field }) => (
                    <React.Fragment>
                      <OTPVerificationField
                        label="Enter OTP"
                        field={{ ...field }}
                        value={formik.values.otpCode}
                        error={formik.errors.otpCode && formik.touched.otpCode}
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
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <CustomButton
                  text="Verify"
                  type="submit"
                  loading={isLoading}
                  sxProps={{
                    height: '47px',
                    fontWeight: 600,
                    fontSize: '18px',
                    bg: primary.main
                  }}
                />
                <span
                  onClick={() => dispatch(resendOtp())}
                  style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontStyle: 'normal',
                    color: primary.main,
                    lineHeight: 'normal',
                    fontFamily: 'Plus Jakarta Sans'
                  }}
                >
                  Resend OTP
                </span>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </StyledAuthWrapper>
  );
};

export default ResetPassword;

// Validation schema for form fields using Yup
const validationSchema = Yup.object({
  otpCode: Yup.string().required('Otp is required')
});

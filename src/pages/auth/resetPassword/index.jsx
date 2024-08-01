import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Icons } from 'assets';
import { primary } from 'theme/pallete';
import TextField from 'components/textField';
import CustomButton from 'components/button';
import { FieldErrorMessage } from 'styles/global';
import { Formik, Field, ErrorMessage } from 'formik';
import StyledAuthWrapper from 'components/authWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from 'provider/features/auth/auth.slice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const resetToken = query.get('resetToken');
  const { isLoading } = useSelector((state) => state.auth.resetPassword);

  // Initial form values
  const initialValues = {
    password: '',
    confirmPassword: ''
  };

  // Custom component for password input with visibility toggle
  const InputPassword = ({ label, name, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <Field name={name}>
        {({ field, form }) => (
          <React.Fragment>
            <TextField
              label={label}
              field={{ ...field }}
              placeholder={placeholder}
              type={showPassword ? 'text' : 'password'}
              error={form.errors[name] && form.touched[name]}
              InputProps={{
                // Password visibility toggle button
                endAdornment: (
                  <InputAdornment position="end" sx={{ margin: 0 }}>
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{
                        right: '15px',
                        position: 'absolute'
                      }}
                    >
                      {showPassword ? (
                        <img src={Icons.eye} alt="eye" />
                      ) : (
                        <img src={Icons.eyeOff} alt="eye-off" />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <ErrorMessage name={name} component={FieldErrorMessage} />
          </React.Fragment>
        )}
      </Field>
    );
  };

  return (
    <StyledAuthWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          const formData = {
            ...data,
            resetToken: resetToken
          };
          dispatch(
            resetPassword({
              formData,
              successCallback: () => navigate('/login')
            })
          );
        }}
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
                <InputPassword
                  name="password"
                  label="New password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="field-control" style={{ paddingBottom: '24px' }}>
                <InputPassword
                  name="confirmPassword"
                  label="Confirm New Password"
                  placeholder="Enter confirm password"
                />
              </div>
              <CustomButton
                text="Done"
                type="submit"
                loading={isLoading}
                sxProps={{
                  height: '47px',
                  fontWeight: 600,
                  fontSize: '18px',
                  bg: primary.main
                }}
              />
              <Box
                sx={{
                  gap: '8px',
                  pt: '32px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: primary.main,
                    fontStyle: 'normal',
                    lineHeight: 'normal',
                    fontFamily: 'Plus Jakarta Sans'
                  }}
                >
                  Do you remember password?
                </span>
                <Link
                  to="/login"
                  style={{
                    fontWeight: 600,
                    fontSize: '14px',
                    fontStyle: 'normal',
                    color: primary.main,
                    lineHeight: 'normal',
                    fontFamily: 'Plus Jakarta Sans'
                  }}
                >
                  Sign In
                </Link>
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
  password: Yup.string()
    .required('Please enter the required field')
    .min(8, 'Password must contain min 8 characters')
    .max(20, 'Password can have max 20 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/,
      'Password must contain at least one upper-case letter, one lower-case letter, one digit character, and one special character'
    ),
  confirmPassword: Yup.string()
    .required('Please enter the required field')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Icons } from 'assets';
import { Link } from 'react-router-dom';
import TextField from 'components/textField';
import CustomButton from 'components/button';
import CustomCheckbox from 'components/checkbox';
import { FieldErrorMessage } from 'styles/global';
import { Formik, Field, ErrorMessage } from 'formik';
import StyledAuthWrapper from 'components/authWrapper';
import {
  Box,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { primary } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'provider/features/auth/auth.slice';

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useSelector((state) => state.auth.login);

  // Initial form values
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false
  };

  return (
    <StyledAuthWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) =>
          dispatch(
            login({
              data,
              verifyAccount: () =>
                (window.location.href = 'account-verification'),
              successCallback: () => (window.location.href = 'dashboard')
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
                <Field name="email">
                  {({ field }) => (
                    <React.Fragment>
                      <TextField
                        type="email"
                        label="Email"
                        field={{ ...field }}
                        placeholder="Enter your email"
                        error={formik.errors.email && formik.touched.email}
                      />
                      <ErrorMessage
                        name={field.name}
                        component={FieldErrorMessage}
                      />
                    </React.Fragment>
                  )}
                </Field>
              </div>
              <div className="field-control">
                <Field name="password">
                  {({ field }) => (
                    <React.Fragment>
                      <TextField
                        label="Password"
                        field={{ ...field }}
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        error={
                          formik.errors.password && formik.touched.password
                        }
                        InputProps={{
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
                  gap: 1,
                  pb: '34px',
                  pt: '18px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  name="rememberMe"
                  label="Remember Me"
                  onChange={formik.handleChange}
                  sx={{
                    margin: '0',
                    color: primary.main,
                    '.MuiFormControlLabel-label': {
                      fontWeight: 500,
                      fontStyle: 'normal',
                      lineHeight: 'normal',
                      fontFamily: 'Plus Jakarta Sans'
                    }
                  }}
                  control={
                    <CustomCheckbox
                      sx={{ mr: '8px' }}
                      checked={formik.values.rememberMe}
                    />
                  }
                />
                <Link
                  to="/forget-password"
                  style={{
                    fontWeight: 500,
                    fontSize: '12px',
                    fontStyle: 'normal',
                    color: primary.main,
                    lineHeight: 'normal',
                    fontFamily: 'Plus Jakarta Sans'
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
              <CustomButton
                text="Sign in"
                type="submit"
                loading={isLoading}
                sxProps={{
                  height: '47px',
                  fontWeight: 600,
                  fontSize: '18px',
                  bg: primary.main
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </StyledAuthWrapper>
  );
};

export default Login;

// Form validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Please enter the required field'),
  // password: Yup.string()
  //   .required('Please enter the required field')
  //   .min(8, 'Password must be at least 8 characters')
  //   .matches(
  //     /^(?=.*\d)(?=.*[!@#$%^&*])/,
  //     'Password must contain at least one digit and one special character'
  //   )
});

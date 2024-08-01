import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Icons } from 'assets';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import TextField from 'components/textField';
import { FieldErrorMessage } from 'styles/global';
import { Formik, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, InputAdornment } from '@mui/material';
import {
  changePassword,
  checkCurrentPassword
} from 'provider/features/profile/profile.slice';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState(false);
  const { isLoading: checkCurrentPasswordLoader } = useSelector(
    (state) => state.profile.checkCurrentPassword
  );
  const { isLoading: changePasswordLoader } = useSelector(
    (state) => state.profile.changePassword
  );

  // Initial values for current and new password
  const initialValues = {
    currentPassword: ''
  };

  const newPasswordValues = {
    newPassword: '',
    confirmPassword: ''
  };

  // Component for rendering password input field
  const InputPassword = ({ name, label, placeholder }) => {
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
                endAdornment: (
                  <InputAdornment position="end" sx={{ margin: 0 }}>
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{
                        right: '20px',
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

  // Handler for form submission
  const handleSubmit = (data, formikBag) => {
    if (!newPassword) {
      // Dispatching action to check the current password
      dispatch(
        checkCurrentPassword({
          currentPassword: data,
          successCallback: () => setNewPassword(true)
        })
      );
    } else {
      // Dispatching action to change the password
      dispatch(changePassword({ data }));
      formikBag.resetForm();
    }
  };

  return (
    <React.Fragment>
      <h3 className="title">Change Password</h3>
      <Formik
        initialValues={!newPassword ? initialValues : newPasswordValues}
        validationSchema={
          !newPassword
            ? currentPasswordValidationSchema
            : newPasswordValidationSchema
        }
        onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
      >
        {(formik) => {
          return (
            <Form
              noValidate
              name="basic"
              autoComplete="off"
              onFinish={formik.handleSubmit}
            >
              {!newPassword ? (
                <div className="field-control">
                  <InputPassword
                    name="currentPassword"
                    label="Current Password"
                    placeholder="Enter your current password"
                  />
                </div>
              ) : (
                <React.Fragment>
                  <div
                    className="field-control"
                    style={{ paddingBottom: '24px' }}
                  >
                    <InputPassword
                      name="newPassword"
                      label="New Password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="field-control">
                    <InputPassword
                      name="confirmPassword"
                      label="Confirm New Password"
                      placeholder="Enter confirm password"
                    />
                  </div>
                </React.Fragment>
              )}
              <Box
                sx={{
                  pt: 3,
                  gap: 2,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  '& > button': {
                    width: '179px'
                  }
                }}
              >
                <CustomButton
                  type="submit"
                  text={!newPassword ? 'Next' : 'Change Password'}
                  loading={
                    !newPassword
                      ? checkCurrentPasswordLoader
                      : changePasswordLoader
                  }
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
    </React.Fragment>
  );
};

export default ChangePassword;

// Validation schema for current password
const currentPasswordValidationSchema = Yup.object({
  currentPassword: Yup.string().required('Please enter the required field')
});

// Validation schema for new password
const newPasswordValidationSchema = Yup.object({
  newPassword: Yup.string()
    .required('Please enter the required field')
    .min(8, 'Password must contain min 8 characters')
    .max(20, 'Password can have max 20 characters'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Password doesn’t match, Please enter the same password'
    )
    .required('Please enter the required field')
});

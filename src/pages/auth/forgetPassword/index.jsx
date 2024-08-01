import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Box } from '@mui/material';
import Dialog from 'components/dialog';
import { Link } from 'react-router-dom';
import { primary } from 'theme/pallete';
import ConfirmEmail from './confirmEmail';
import TextField from 'components/textField';
import CustomButton from 'components/button';
import { FieldErrorMessage } from 'styles/global';
import { Formik, Field, ErrorMessage } from 'formik';
import StyledAuthWrapper from 'components/authWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from 'provider/features/auth/auth.slice';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLoading } = useSelector((state) => state.auth.forgotPassword);

  // Callback function to handle success and open the confirmation dialog
  const successCallback = (email) => {
    setEmail(email);
    setDialogOpen(true);
  };

  return (
    <StyledAuthWrapper>
      {dialogOpen && (
        <Dialog open={dialogOpen} setOpen={setDialogOpen}>
          <ConfirmEmail email={email} />
        </Dialog>
      )}

      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          const payload = { email: data.email };
          dispatch(forgotPassword({ payload, successCallback }));
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
              <div className="field-control" style={{ paddingBottom: '32px' }}>
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

              <CustomButton
                text="Next"
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
                  pb: '32px',
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

export default ForgotPassword;

// Yup validation schema for the email field
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Please enter the required field')
});

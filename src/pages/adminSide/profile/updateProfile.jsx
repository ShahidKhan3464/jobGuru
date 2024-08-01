import React from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Box } from '@mui/material';
import CustomButton from 'components/button';
import TextField from 'components/textField';
import PhoneField from 'components/phoneField';
import { FieldErrorMessage } from 'styles/global';
import { Formik, Field, ErrorMessage } from 'formik';
import { primary, customColors } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import {
  viewProfile,
  updateProfile
} from 'provider/features/profile/profile.slice';

const UpdateProfile = ({ setIsEditable }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile.viewProfile);
  const { isLoading } = useSelector((state) => state.profile.updateProfile);

  // Initial values for the form fields
  const initialValues = {
    fullName: data?.fullName || '',
    displayName: data?.displayName || '',
    phoneNumber: data?.phoneNumber || ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        dispatch(
          updateProfile({
            data,
            successCallback: () => {
              setIsEditable(false);
              dispatch(viewProfile());
            }
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
            <Box
              sx={{
                pb: 3,
                gap: 3,
                display: 'flex',
                alignItems: 'center',

                '& > .field-control': {
                  width: '100%'
                },
                '@media screen and (max-width: 767px)': {
                  pb: 1.5,
                  gap: 1.5,
                  flexWrap: 'wrap'
                }
              }}
            >
              <div className="field-control">
                <Field name="fullName">
                  {({ field }) => (
                    <React.Fragment>
                      <TextField
                        type="text"
                        label="Full Name"
                        field={{ ...field }}
                        value={formik.values.fullName}
                        placeholder="Enter your full name"
                        error={
                          formik.errors.fullName && formik.touched.fullName
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
              <div className="field-control">
                <Field name="displayName">
                  {({ field }) => (
                    <React.Fragment>
                      <TextField
                        type="text"
                        label="Display Name"
                        field={{ ...field }}
                        value={formik.values.displayName}
                        placeholder="Enter your display name"
                        error={
                          formik.errors.displayName &&
                          formik.touched.displayName
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
            </Box>
            <Box
              sx={{
                gap: '24px',
                display: 'flex',
                alignItems: 'center',
                paddingBottom: '24px',

                '& > .field-control': {
                  width: '100%'
                },

                '@media screen and (max-width: 767px)': {
                  pb: 1.5,
                  gap: 1.5,
                  flexWrap: 'wrap'
                }
              }}
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
              <div className="field-control">
                <Field name="phoneNumber">
                  {({ field }) => (
                    <React.Fragment>
                      <PhoneField
                        form={formik}
                        name="phoneNumber"
                        field={{ ...field }}
                        label="Phone Number"
                        value={formik.values.phoneNumber}
                        placeholder="Enter your phone number"
                        error={
                          formik.errors.phoneNumber &&
                          formik.touched.phoneNumber
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
            </Box>

            <Box
              sx={{
                pt: 3,
                gap: 2,
                display: 'flex',
                flexWrap: 'wrap',
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
                text="Cancel"
                variant="outlined"
                tColor={primary.main}
                borderColor={primary.main}
                clicked={() => setIsEditable(false)}
                sxProps={{
                  height: '44px',
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              />
              <CustomButton
                type="submit"
                text="Save Changes"
                loading={isLoading}
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
  );
};

export default UpdateProfile;

// Validation schema for form fields
const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'Full name can have min 3 characters')
    .max(120, 'Full name can have max 120 characters')
    .required('Please enter the required field'),
  displayName: Yup.string()
    .min(5, 'Display name can have min 5 characters')
    .max(30, 'Display name can have max 30 characters')
    .required('Please enter the required field'),
  phoneNumber: Yup.string().required('Please enter the required field')
});

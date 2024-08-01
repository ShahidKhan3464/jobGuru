import React from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { primary } from 'theme/pallete';
import TextField from 'components/textField';
import CustomButton from 'components/button';
import { StyledAddInstructor } from './style';
import PhoneField from 'components/phoneField';
import { FieldErrorMessage } from 'styles/global';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addInstructor } from 'provider/features/instructors/instructors.slice';

const AddInstructorForm = ({ setOpen, setPayload }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.instructor.add);

  // Initial values for form fields
  const initialValues = {
    fullName: '',
    email: '',
    phoneNo: ''
  };

  // Handling form submission
  const handleSubmit = async (data) => {
    const formData = {
      ...data,
      role: 'INSTRUCTOR'
    };
    await dispatch(addInstructor({ formData }));
    setOpen(false);
    setPayload((prevData) => ({ ...prevData }));
  };

  return (
    <StyledAddInstructor>
      <div className="header">
        <h3>Add New Instructor</h3>
        <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setOpen(false)} />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                <Field name="fullName">
                  {({ field }) => (
                    <React.Fragment>
                      <TextField
                        type="text"
                        label="Full Name"
                        field={{ ...field }}
                        placeholder="Enter instructor full name"
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
                <Field name="email">
                  {({ field }) => (
                    <React.Fragment>
                      <TextField
                        type="email"
                        field={{ ...field }}
                        label="Email Address"
                        placeholder="Enter instructor email"
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
                <Field name="phoneNo">
                  {({ field }) => (
                    <React.Fragment>
                      <PhoneField
                        form={formik}
                        name="phoneNo"
                        field={{ ...field }}
                        label="Phone Number"
                        placeholder="Enter Instructor Phone Number"
                        error={formik.errors.phoneNo && formik.touched.phoneNo}
                      />
                      <ErrorMessage
                        name={field.name}
                        component={FieldErrorMessage}
                      />
                    </React.Fragment>
                  )}
                </Field>
              </div>
              <div className="btn-container">
                <CustomButton
                  text="Cancel"
                  variant="outlined"
                  tColor={primary.main}
                  borderColor={primary.main}
                  clicked={() => setOpen(false)}
                  sxProps={{
                    height: '48px',
                    fontWeight: 600,
                    fontSize: '16px',
                    bg: primary.main
                  }}
                />
                <CustomButton
                  type="submit"
                  text="Send Invite"
                  loading={isLoading}
                  sxProps={{
                    height: '48px',
                    fontWeight: 600,
                    fontSize: '16px',
                    bg: primary.main
                  }}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </StyledAddInstructor>
  );
};

export default AddInstructorForm;

// Form validation schema using Yup
const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(5, 'Full name can have min 5 characters')
    .max(50, 'Full name can have max 50 characters'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Please enter the required field')
});

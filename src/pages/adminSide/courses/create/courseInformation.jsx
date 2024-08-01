import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { primary } from 'theme/pallete';
import { IconButton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import SelectionList from './selectionList';
import { customColors } from 'theme/pallete';
import TextField from 'components/textField';
import CustomButton from 'components/button';
import AddIcon from '@mui/icons-material/Add';
import FileUpload from 'components/fileUpload';
import { Formik, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { FieldErrorMessage, StyledTextarea } from 'styles/global';
import { courseDetails } from 'provider/features/courses/courses.slice';
import { courseThumbnail } from 'provider/features/fileUpload/fileUpload.slice';

const CourseInformation = ({ data, setData, setCurrentStep }) => {
  const { id } = useParams();
  const formikRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const [selectedFile, setSelectedFile] = useState(null);
  const [courseOutcomes, setCourseOutcomes] = useState([]);
  const { data: detailsData } = useSelector((state) => state.courses.details);
  const { data: courseThumbnailData, isLoading: courseThumbnailLoading } =
    useSelector((state) => state.file.courseThumbnail);
  const path = location.split('/')[2];

  // Initial form values
  const initialValues = {
    name: '',
    description: '',
    outcomes: '',
    thumbnail: false
  };

  // Function to check if course outcomes are valid
  const isCourseOutcomesValid = (formik) => {
    return validationSchema.fields.outcomes.isValidSync(formik.values.outcomes);
  };

  // Function to enable/disable "Save & Next" button
  const handleSaveAndNextButtonEnable = (formik) => {
    const requiredValuesalues = !(
      formik.values.name && formik.values.description
    );
    const outcomes = courseOutcomes.length === 0;
    return requiredValuesalues || outcomes || !selectedFile;
  };

  // Function to add course outcome to the list
  const handleAddCourseOutcome = (formik) => {
    if (isCourseOutcomesValid(formik)) {
      formik.setFieldValue('outcomes', '');
      setCourseOutcomes((prev) => [...prev, formik.values.outcomes]);
    }
  };

  // Function to remove a course outcome from the list
  const handleRemoveCourseOutcome = (index) => {
    const newOutcomes = [...courseOutcomes];
    newOutcomes.splice(index, 1);
    setCourseOutcomes(newOutcomes);
  };

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const acceptedFormats = ['png', 'jpg', 'jpeg'];
    const maxSingleFileSizeInBytes = 2 * 1024 * 1024;

    const fileName = file?.name;
    const fileSize = file?.size;
    const fileExtension = fileName?.split('.').pop().toLowerCase();

    if (!acceptedFormats.includes(fileExtension)) {
      enqueueSnackbar('Unsupported file format.', { variant: 'error' });
      return;
    }

    if (fileSize > maxSingleFileSizeInBytes) {
      enqueueSnackbar(
        'File size exceeds the maximum limit (2 MB). Please upload a file under 2 MB.',
        { variant: 'error' }
      );
      return;
    }

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      dispatch(
        courseThumbnail({
          formData,
          successCallback: () => {
            setSelectedFile(file)
            formikRef.current.setFieldValue('thumbnail', true)
          }
        })
      );
    }
  };

  // Function to remove the selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    formikRef.current.setFieldValue('thumbnail', false)
  };

  // Function to handle form submission
  const handleSubmit = (data) => {
    const payload = {
      ...data,
      outcomes: courseOutcomes,
      thumbnail: courseThumbnailData || detailsData?.course?.course?.thumbnail
    };
    // dispatch(setCourseInfo(payload));
    setData(prev => ({ ...prev, information: payload }))
    setCurrentStep((prev) => prev + 1);
  };

  useEffect(() => {
    // Update form data when back from the next step
    if (data?.information) {
      const { information } = data;
      setSelectedFile(information?.thumbnail);
      setCourseOutcomes(information?.outcomes);
      formikRef.current.setValues({
        ...formikRef.current.values,
        thumbnail: true,
        name: information?.name,
        description: information?.description,
        outcomes: ''
      });
      return;
    }

    // Update form data when route is editCourse
    if (id && detailsData?.course) {
      const course = detailsData?.course?.course;
      setSelectedFile(course.thumbnail);
      setCourseOutcomes(course.outcomes);
      formikRef.current.setValues({
        ...formikRef.current.values,
        thumbnail: true,
        name: course.name,
        description: course.description,
        outcomes: ''
      });
    }

  }, [dispatch, data, detailsData, id]);

  useEffect(() => {
    if (id) {
      dispatch(courseDetails({ courseId: id }));
    }
  }, [dispatch, id]);

  return (
    <Formik
      innerRef={formikRef}
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
              <Field name="name">
                {({ field }) => (
                  <React.Fragment>
                    <TextField
                      type="text"
                      label="Course Name"
                      field={{ ...field }}
                      value={formik.values.name}
                      // disabled={path === 'newBatch'}
                      placeholder="Enter course name"
                      error={formik.errors.name && formik.touched.name}
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
              <Field name="description">
                {({ field }) => (
                  <StyledTextarea>
                    <TextField
                      type="text"
                      multiline={true}
                      field={{ ...field }}
                      label="Course Description"
                      // disabled={path === 'newBatch'}
                      value={formik.values.description}
                      placeholder="Enter course description"
                      error={
                        formik.errors.description && formik.touched.description
                      }
                    />
                    <ErrorMessage
                      name={field.name}
                      component={FieldErrorMessage}
                    />
                  </StyledTextarea>
                )}
              </Field>
            </div>
            <div className="field-control">
              <Field name="outcomes">
                {({ field }) => (
                  <React.Fragment>
                    <TextField
                      type="text"
                      field={{ ...field }}
                      label="Course Outcomes"
                      // disabled={path === 'newBatch'}
                      value={formik.values.outcomes}
                      placeholder="Enter course outcomes"
                      error={formik.errors.outcomes && formik.touched.outcomes}
                    />
                    <ErrorMessage
                      name={field.name}
                      component={FieldErrorMessage}
                    />
                    <IconButton
                      size="large"
                      disabled={!formik.values.outcomes}
                      onClick={() => handleAddCourseOutcome(formik)}
                      sx={{
                        top: '38px',
                        right: '12px',
                        padding: '4px',
                        borderRadius: '6px',
                        position: 'absolute',
                        background: primary.main,

                        '&[disabled]': {
                          cursor: 'not-allowed',
                          backgroundColor: primary.lightest
                        },

                        '&:hover': {
                          background: primary.main
                        },

                        '& >svg': {
                          fontSize: '16px',
                          color: customColors.white
                        },
                        '@media screen and (max-width: 520px)': {
                          top: '30px'
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </React.Fragment>
                )}
              </Field>
              {courseOutcomes?.length > 0 && (
                <SelectionList
                  items={courseOutcomes}
                  // disabled={path === 'newBatch'}
                  onRemoveItem={handleRemoveCourseOutcome}
                />
              )}
            </div>
            <div className="field-control">
              <FileUpload
                multiple={false}
                label="Course Thumbnail"
                selectedFile={selectedFile}
                // disabled={path === 'newBatch'}
                isLoading={courseThumbnailLoading}
                handleRemoveFile={handleRemoveFile}
                handleFileUpload={handleFileUpload}
                previewURL={selectedFile?.url || courseThumbnailData?.url}
                error={formik.errors.thumbnail && formik.touched.thumbnail}
              />
              <ErrorMessage
                name={'thumbnail'}
                component={FieldErrorMessage}
              />
            </div>
            <div className="btn-container">
              <CustomButton
                type="submit"
                text="Save & Next"
                // disabled={handleSaveAndNextButtonEnable(formik)}
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
  );
};

export default CourseInformation;

// Validation schema using Yup for form validation
const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, 'Course name can have min 5 characters')
    .max(50, 'Course name can have max 50 characters')
    .required('Please enter the required field'),
  description: Yup.string()
    .min(5, 'Description can have min 5 characters')
    .max(1000, 'Description can have max 1000 characters')
    .required('Please enter the required field'),
  outcomes: Yup.string()
    .min(5, 'Course outcomes can have min 5 characters')
    .max(100, 'Course outcomes can have max 100 characters'),
  thumbnail: Yup.boolean().test('is-true', 'File is required', (value) => value === true),
});

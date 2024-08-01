import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from 'antd';
import { IconButton } from '@mui/material';
import SelectionList from './selectionList';
import { enqueueSnackbar } from 'notistack';
import TextField from 'components/textField';
import CustomButton from 'components/button';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';
import FileUpload from 'components/fileUpload';
import SelectField from 'components/selectField';
import { FieldErrorMessage } from 'styles/global';
import { Formik, Field, ErrorMessage } from 'formik';
import { customColors, primary } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import {
  lectureMaterial,
  lectureMaterials
} from 'provider/features/fileUpload/fileUpload.slice';

const LectureForm = ({
  topics,
  timeSlot,
  onSubmit,
  materials,
  setTopics,
  courseTime,
  formValues,
  instructors,
  setMaterials,
  selectedValues,
  setCurrentStep,
  upcomingLecture,
  setInstructorId
}) => {
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const location = useLocation().pathname;
  const { isLoading } = useSelector((state) => state.file.lectureMaterials);
  const path = location.split('/')[2];

  // Function to check if topics are valid
  const istopicsValid = (formik) => {
    return validationSchema.fields.topics.isValidSync(formik.values.topics);
  };

  // Function to enable/disable "Save & Next" button
  const handleSaveAndNextButtonEnable = (formik) => {
    const requiredDate = timeSlot.date;
    const requiredValues = !(formik.values.title && formik.values.instructor);
    const isAllTruthySelectedValues = Object.values(selectedValues).every(
      (value) => !!value
    );
    const isAllTruthyCourseTime = Object.values(courseTime).every(
      (value) => !!value
    );
    const topicTags = topics.length === 0;

    return (
      topicTags ||
      !requiredDate ||
      requiredValues ||
      !isAllTruthyCourseTime ||
      !isAllTruthySelectedValues
    );
  };

  // Function to add topics to the list
  const handleAddTopics = (formik) => {
    if (istopicsValid(formik)) {
      formik.setFieldValue('topics', '');
      setTopics((prev) => [...prev, formik.values.topics]);
    }
  };

  // Function to remove a topic from the list
  const handleRemoveTopics = (index) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  // Function to handle single file upload
  const handleSingleFile = (totalSizeInBytes, acceptedFormats, file) => {
    const fileName = file.name;
    const fileSize = file.size;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (!acceptedFormats.includes(fileExtension)) {
      enqueueSnackbar('Unsupported file format.', { variant: 'error' });
      return;
    }

    if (fileSize > totalSizeInBytes) {
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
        lectureMaterial({
          formData,
          successCallback: (data) => {
            setMaterials((prevState) => ({
              ...prevState,
              selected: file,
              uploadedFiles: [data]
            }));
          }
        })
      );
    }
  };

  // Function to handle multiple file uploads
  const handleMultipleFiles = (totalSizeInBytes, acceptedFormats, files) => {
    let totalSize = 0;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name;
      const fileSize = file.size;
      const fileExtension = fileName.split('.').pop().toLowerCase();

      if (!acceptedFormats.includes(fileExtension)) {
        enqueueSnackbar('One or more files have unsupported formats.', {
          variant: 'error'
        });
        continue;
      }

      if (fileSize > totalSizeInBytes - totalSize) {
        enqueueSnackbar(
          'Total file size exceeds the maximum limit (15 MB). Please upload files within the total size limit.',
          { variant: 'error' }
        );
        break;
      }

      formData.append('files', file);
      totalSize += fileSize;
    }

    if (files) {
      dispatch(
        lectureMaterials({
          formData,
          successCallback: (data) => {
            setMaterials((prevState) => ({
              ...prevState,
              selected: files,
              uploadedFiles: data
            }));
          }
        })
      );
    }
  };

  // Function to handle file upload
  const handleUploadMaterial = (e) => {
    let totalSizeInBytes = 1024 * 1024;
    const selectedFiles = e.target.files;
    const acceptedFormats = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'];
    if (selectedFiles) {
      if (selectedFiles.length === 1) {
        totalSizeInBytes *= 2;
        handleSingleFile(totalSizeInBytes, acceptedFormats, selectedFiles[0]);
        return;
      }
      totalSizeInBytes *= 15;
      handleMultipleFiles(totalSizeInBytes, acceptedFormats, selectedFiles);
    }
  };

  // Function to handle removal of material
  const handleRemoveMaterial = (index) => {
    const newFileMaterials = [...materials.uploadedFiles];
    newFileMaterials.splice(index, 1);
    setMaterials((prevState) => ({
      ...prevState,
      uploadedFiles: newFileMaterials
    }));
    newFileMaterials.length === 0 &&
      setMaterials((prevState) => ({
        ...prevState,
        selected: null
      }));
  };

  const handleSubmit = (data, { resetForm }) => {
    onSubmit({ data, resetForm });
  };

  useEffect(() => {
    formikRef.current.setValues({
      ...formikRef.current.values,
      title: formValues?.title,
      instructor: formValues?.instructor
    });
  }, [formValues]);

  return (
    <Formik
      innerRef={formikRef}
      onSubmit={handleSubmit}
      initialValues={formValues}
      validationSchema={validationSchema}
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
              <Field name="title">
                {({ field }) => (
                  <React.Fragment>
                    <TextField
                      type="text"
                      label="Class Title"
                      field={{ ...field }}
                      value={formik.values.title}
                      placeholder="Enter class title"
                      error={formik.errors.title && formik.touched.title}
                      disabled={path === 'editCourse' && !upcomingLecture}
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
              <Field name="topics">
                {({ field }) => (
                  <React.Fragment>
                    <TextField
                      type="text"
                      field={{ ...field }}
                      label="Class Topics"
                      value={formik.values.topics}
                      disabled={path === 'editCourse' && !upcomingLecture}
                      error={formik.errors.topics && formik.touched.topics}
                      placeholder="Enter the topics that are covered in this class"
                    />
                    <ErrorMessage
                      name={field.name}
                      component={FieldErrorMessage}
                    />
                    <IconButton
                      size="large"
                      disabled={!formik.values.topics}
                      onClick={() => handleAddTopics(formik)}
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
              {topics.length > 0 && (
                <SelectionList
                  items={topics}
                  onRemoveItem={handleRemoveTopics}
                  disabled={path === 'editCourse' && !upcomingLecture}
                />
              )}
            </div>
            <div className="field-control">
              <Field name="instructor">
                {({ field }) => (
                  <React.Fragment>
                    <SelectField
                      name="instructor"
                      label="Instructor"
                      field={{ ...field }}
                      options={instructors.selected}
                      placeholder="Select instructor"
                      value={formik.values.instructor}
                      disabled={path === 'editCourse' && !upcomingLecture}
                      onChange={(e) => {
                        formik.setFieldValue(
                          'instructor',
                          e.target?.value?.text
                        );
                        setInstructorId(e.target?.value._id);
                      }}
                      error={
                        formik.errors.instructor && formik.touched.instructor
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
              <FileUpload
                multiple={true}
                label="Class Material"
                isLoading={isLoading}
                selectedFile={materials.selected}
                fileMaterials={materials.uploadedFiles}
                handleFileUpload={handleUploadMaterial}
                handleRemoveFile={handleRemoveMaterial}
                disabled={path === 'editCourse' && !upcomingLecture}
              />
            </div>
            <div className="btn-container">
              <CustomButton
                text="Previous"
                variant="outlined"
                tColor={primary.main}
                borderColor={primary.main}
                clicked={() => setCurrentStep((prev) => prev - 1)}
                sxProps={{
                  height: '48px',
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              />
              <CustomButton
                type="submit"
                text="Save & Next"
                disabled={handleSaveAndNextButtonEnable(formik)}
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

export default LectureForm;
// Validation schema for form fields
const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, 'Title can have min 5 characters')
    .max(30, 'Title can have max 30 characters')
    .required('Please enter the required field'),
  topics: Yup.string()
    .min(5, 'Topics can have min 5 characters')
    .max(300, 'Topics can have max 300 characters'),
  instructor: Yup.string().required('Please enter the required field')
});

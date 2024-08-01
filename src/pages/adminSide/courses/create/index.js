import React, { useCallback, useState } from 'react';
import CoursePreview from './coursePreview';
import CourseContent from './courseContent';
import CoursePayment from './coursePayment';
import { StyledCreateNewCourse } from './style';
import { StyledContentBox } from 'styles/global';
import CustomizedStepper from 'components/stepper';
import CourseInformation from './courseInformation';

const stepsLabel = [
  'Course Information',
  'Course Content',
  'Course Payment',
  'Course Preview'
];

const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [globalCourseData, setGlobalCourseData] = useState({
    information: null,
    content: null,
    payment: null
  });

  const getStepContent = useCallback((step) => {
    switch (step) {
      case 1:
        return <CourseInformation
          data={globalCourseData}
          setData={setGlobalCourseData}
          setCurrentStep={setCurrentStep}
        />;
      case 2:
        return <CourseContent
          data={globalCourseData}
          setData={setGlobalCourseData}
          setCurrentStep={setCurrentStep}
        />;
      case 3:
        return <CoursePayment
          data={globalCourseData}
          setData={setGlobalCourseData}
          setCurrentStep={setCurrentStep}
        />;
      case 4:
        return <CoursePreview
          data={globalCourseData}
          setData={setGlobalCourseData}
          setCurrentStep={setCurrentStep}
        />;
      default:
        return null;
    }
  }, [globalCourseData, setGlobalCourseData]);

  return (
    <StyledContentBox>
      <StyledCreateNewCourse>
        <CustomizedStepper stepsLabel={stepsLabel} currentStep={currentStep} />
        {currentStep !== stepsLabel.length + 1 && getStepContent(currentStep)}
      </StyledCreateNewCourse>
    </StyledContentBox>
  );
};

export default CreateCourse;


// {selectedFile && <FieldErrorMessage>Please upload a file</FieldErrorMessage>}
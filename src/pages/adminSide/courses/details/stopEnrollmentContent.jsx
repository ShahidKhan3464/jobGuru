import React from 'react';
import { Icons } from 'assets';
import { Box } from '@mui/material';
import CustomButton from 'components/button';
import { useParams } from 'react-router-dom';
import { customColors } from 'theme/pallete';
import { StyledPopContent } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import { courseDetails, stopEnrollment } from 'provider/features/courses/courses.slice';

const StopEnrollmentContent = ({ courseId, setOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.courses.stopEnrollment);

  const successCallback = () => {
    dispatch(courseDetails({ courseId: id }));
  }

  const handleStopEnrollment = async (courseId) => {
    await dispatch(stopEnrollment({ courseId, successCallback }));
    setOpen(false);
  };

  return (
    <StyledPopContent>
      <Box
        sx={{
          width: "48px",
          height: "48px",
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          background: customColors.danger,
        }}
      >
        <img src={Icons.whiteCross} alt="cross" />
      </Box>
      <div className="text">
        <h3>Stop Enrollment</h3>
        <p>Are you sure, you want to stop this course enrollment?</p>
      </div>
      <div className="btn-container">
        <CustomButton
          text="Cancel"
          variant="outlined"
          clicked={() => setOpen(false)}
          tColor={customColors.lightGrey}
          borderColor={customColors.lightGrey}
          sxProps={{
            height: "44px",
            fontWeight: 600,
            fontSize: "16px",
          }}
        />
        <CustomButton
          text="Stop"
          loading={isLoading}
          clicked={() => handleStopEnrollment(courseId)}
          sxProps={{
            height: "44px",
            fontWeight: 600,
            fontSize: "16px",
            bg: customColors.danger,
          }}
        />
      </div>
    </StyledPopContent>
  )
};

export default StopEnrollmentContent;

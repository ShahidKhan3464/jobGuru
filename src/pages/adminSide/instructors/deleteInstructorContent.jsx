import React from 'react';
import { Icons } from 'assets';
import { Box } from '@mui/material';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { StyledPopContent } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInstructor } from 'provider/features/instructors/instructors.slice';

const DeleteInstructorContent = ({
  id,
  setOpen,
  setPayload,
  isDetailPage = null
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.instructor.delete);

  // Function to handle the deletion of an instructor
  const handleDeleteInstructor = async (id) => {
    await dispatch(deleteInstructor({ id }));

    // If it's not a detail page, close the dialog and refresh the instructor list
    if (!isDetailPage) {
      setOpen(false);
      setPayload((prevData) => ({ ...prevData }));
      return;
    }

    // If it's a detail page, close the dialog and navigate to the instructors page
    setOpen(false);
    navigate('/instructors');
  };

  return (
    <StyledPopContent>
      <Box
        sx={{
          width: '48px',
          height: '48px',
          display: 'flex',
          borderRadius: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          background: customColors.danger
        }}
      >
        <img src={Icons.trash} alt="trash" />
      </Box>
      <div className="text">
        <h3>Delete</h3>
        <p>Are you sure, you want to delete the instructor?</p>
      </div>
      <div className="btn-container">
        <CustomButton
          text="Cancel"
          variant="outlined"
          clicked={() => setOpen(false)}
          tColor={customColors.lightGrey}
          borderColor={customColors.lightGrey}
          sxProps={{
            height: '44px',
            fontWeight: 600,
            fontSize: '16px'
          }}
        />
        <CustomButton
          text="Delete"
          loading={isLoading}
          clicked={() => handleDeleteInstructor(id)}
          sxProps={{
            height: '44px',
            fontWeight: 600,
            fontSize: '16px',
            bg: customColors.danger
          }}
        />
      </div>
    </StyledPopContent>
  );
};

export default DeleteInstructorContent;

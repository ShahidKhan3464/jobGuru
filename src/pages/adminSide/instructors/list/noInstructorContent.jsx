import React from 'react';
import { Icons } from 'assets';
import { secondary } from 'theme/pallete';
import CustomButton from 'components/button';
import AddIcon from '@mui/icons-material/Add';
import { StyledNoInstructorContent } from './style';

const NoInstructorContent = ({ value, setOpen }) => {
  return (
    <StyledNoInstructorContent>
      <img src={Icons.instructorVector} alt="vector" />
      <div>
        {value ? (
          <p>No Instructors Found</p>
        ) : (
          <React.Fragment>
            <p>No Instructors Added Yet</p>
            <CustomButton
              startIcon={<AddIcon />}
              text="Add New Instructor"
              clicked={() => setOpen(true)}
              sxProps={{
                height: '44px',
                fontWeight: 600,
                fontSize: '16px',
                bg: secondary.main
              }}
            />
          </React.Fragment>
        )}
      </div>
    </StyledNoInstructorContent>
  );
};

export default NoInstructorContent;

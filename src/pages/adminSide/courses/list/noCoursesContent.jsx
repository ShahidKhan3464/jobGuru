import React from 'react';
import { Icons } from 'assets';
import { secondary } from 'theme/pallete';
import CustomButton from 'components/button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { StyledNoCoursesContent } from './style';

const NoCourseContent = ({ value }) => {
  const navigate = useNavigate();

  return (
    <StyledNoCoursesContent>
      <img src={Icons.courseVector} alt="vector" />
      <div>
        {value ? (
          <p>No Courses Found</p>
        ) : (
          <React.Fragment>
            <p>No Courses Created Yet</p>
            <CustomButton
              text="Add New Course"
              startIcon={<AddIcon />}
              clicked={() => navigate('/course/createCourse')}
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
    </StyledNoCoursesContent>
  );
};

export default NoCourseContent;

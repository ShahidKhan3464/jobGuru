import React from 'react';
import { Icons } from 'assets';
import { Box } from '@mui/material';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { StyledPopContent } from 'styles/global';

const LogoutContent = ({ setOpen }) => {
  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    window.location.href = '/login';
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
        <img src={Icons.logout} alt="logout" />
      </Box>
      <div className="text">
        <h3>Logout</h3>
        <p>Are you sure, you want to Logout?</p>
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
          text="Logout"
          clicked={() => handleLogout()}
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

export default LogoutContent;

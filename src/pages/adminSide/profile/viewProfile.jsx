import React from 'react';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const ViewProfile = () => {
  const { data } = useSelector((state) => state.profile.viewProfile);

  return (
    // Using MUI Grid to create a two-column layout
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <Box sx={{ paddingBottom: 3 }}>
          <h3 className="key">Full Name</h3>
          <p className="value">{data?.fullName || 'N/A'}</p>
        </Box>
        <Box sx={{ paddingBottom: 3 }}>
          <h3 className="key">Email</h3>
          <p className="value">{data?.email || 'N/A'}</p>
        </Box>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Box sx={{ paddingBottom: 3 }}>
          <h3 className="key">Display Name</h3>
          <p className="value">{data?.displayName || 'N/A'}</p>
        </Box>
        <Box sx={{ paddingBottom: 3 }}>
          <h3 className="key">Phone Number</h3>
          <p className="value">+{data?.phoneNumber || 'N/A'}</p>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ViewProfile;

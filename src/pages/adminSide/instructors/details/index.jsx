import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import Dialog from 'components/dialog';
import CustomButton from 'components/button';
import { useParams } from 'react-router-dom';
import { customColors, primary } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter, truncatedString } from 'utils';
import DeleteInstructorContent from '../deleteInstructorContent';
import { Avatar, Box, CircularProgress, Grid } from '@mui/material';
import { StyledDetailContent, StyledLoadingContainer } from 'styles/global';
import { instructorDetails } from 'provider/features/instructors/instructors.slice';

const Details = () => {
  const isDetailPage = true;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLoading, data } = useSelector((state) => state.instructor.details);

  useEffect(() => {
    dispatch(instructorDetails({ id }));
  }, [dispatch, id]);

  return (
    <StyledDetailContent>
      {dialogOpen && (
        <Dialog open={dialogOpen} setOpen={setDialogOpen}>
          <DeleteInstructorContent
            id={id}
            isDetailPage={isDetailPage}
            setOpen={(value) => setDialogOpen(value)}
          />
        </Dialog>
      )}

      {isLoading ? (
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      ) : (
        <React.Fragment>
          <div className="bg-img"></div>
          <div className="profile">
            <div className="profile_content">
              <div className="profile_content_dp">
                <div className="profile_content_dp_img">
                  <Avatar
                    alt="avatar"
                    src={data?.profile?.photo}
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: primary.contrast,
                      border: `4px solid ${customColors.white}`
                    }}
                  />
                </div>
                <h3 className="profile_content_dp_name">
                  {truncatedString(capitalizeFirstLetter(data?.fullName))}
                </h3>
              </div>
              <CustomButton
                text="Delete"
                clicked={() => setDialogOpen(true)}
                startIcon={<img src={Icons.trash} alt="edit" />}
                sxProps={{
                  height: '44px',
                  fontWeight: 600,
                  fontSize: '16px',
                  bg: customColors.danger
                }}
              />
            </div>
            <div className="profile_data">
              <Grid container spacing={2}>
                <Grid item sm={4} xs={6}>
                  <Box sx={{ paddingBottom: 3 }}>
                    <h3 className="key">Full Name</h3>
                    <p className="value">
                      {truncatedString(capitalizeFirstLetter(data?.fullName)) ||
                        'N/A'}
                    </p>
                  </Box>
                  <Box sx={{ paddingBottom: 3 }}>
                    <h3 className="key">Phone Number</h3>
                    <p className="value">{data?.phoneNumber || 'N/A'}</p>
                  </Box>
                  <Box sx={{ paddingBottom: 3 }}>
                    <h3 className="key">City</h3>
                    <p className="value">{data?.profile?.city || 'N/A'}</p>
                  </Box>
                  <Box>
                    <h3 className="key">Address</h3>
                    <p className="value">{data?.profile?.address || 'N/A'}</p>
                  </Box>
                </Grid>
                <Grid item sm={8} xs={6}>
                  <Box sx={{ paddingBottom: 3 }}>
                    <h3 className="key">Gender</h3>
                    <p className="value">
                      {capitalizeFirstLetter(data?.profile?.gender) || 'N/A'}
                    </p>
                  </Box>
                  <Box sx={{ paddingBottom: 3 }}>
                    <h3 className="key">Country</h3>
                    <p className="value">{data?.profile?.country || 'N/A'}</p>
                  </Box>
                  <Box sx={{ paddingBottom: 3 }}>
                    <h3 className="key">Zip Code</h3>
                    <p className="value">{data?.profile?.zipCode || 'N/A'}</p>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>
        </React.Fragment>
      )}
    </StyledDetailContent>
  );
};

export default Details;

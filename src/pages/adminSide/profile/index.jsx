import React, { useRef, useState } from 'react';
import { Icons } from 'assets';
import ViewProfile from './viewProfile';
import TwoFactorAuth from './twoFactorAuth';
import UpdateProfile from './updateProfile';
import { enqueueSnackbar } from 'notistack';
import CustomButton from 'components/button';
import ChangePassword from './changePassword';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, CircularProgress } from '@mui/material';
import { primary, secondary, customColors } from 'theme/pallete';
import { updateProfile } from 'provider/features/profile/profile.slice';
import { StyledDetailContent, StyledLoadingContainer } from 'styles/global';
import {
  viewProfile,
  updateProfileImage
} from 'provider/features/profile/profile.slice';

const Profile = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const [isEditable, setIsEditable] = useState(false);
  const { isLoading, data } = useSelector((state) => state.profile.viewProfile);

  // Style for active buttons
  const activeButtonStyle = {
    width: '225px',
    '&:nth-of-type(1)': {
      background:
        activeTab === 1
          ? 'linear-gradient(99deg, #012168 -1.25%, #017ABB 96.97%)'
          : customColors.white
    },
    '&:nth-of-type(2)': {
      background:
        activeTab === 2
          ? 'linear-gradient(99deg, #012168 -1.25%, #017ABB 96.97%)'
          : customColors.white
    },
    '&:nth-of-type(3)': {
      background:
        activeTab === 3
          ? 'linear-gradient(99deg, #012168 -1.25%, #017ABB 96.97%)'
          : customColors.white
    }
  };

  const successCallback = (url) => {
    let payload = { photo: url };
    dispatch(
      updateProfile({
        data: payload,
        successCallback: () => {
          dispatch(viewProfile());
        }
      })
    );
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    const acceptedFormats = ['png', 'jpg', 'jpeg'];

    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (!acceptedFormats.includes(fileExtension)) {
      enqueueSnackbar('Please upload a valid file.', { variant: 'error' });
      return;
    }

    if (file) {
      formData.append('file', file);
      dispatch(
        updateProfileImage({
          formData,
          successCallback
        })
      );
    }
  };

  return (
    <StyledDetailContent>
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                  }}
                >
                  <div className="profile_content_dp_img">
                    <Avatar
                      alt="avatar"
                      src={data?.photo}
                      sx={{
                        width: '100%',
                        height: '100%',
                        background: primary.contrast,
                        border: `4px solid ${customColors.white}`
                      }}
                    />
                  </div>
                  <div
                    className="profile_content_dp_upload"
                    onClick={() => inputRef.current.click()}
                  >
                    <img src={Icons.camera} alt="camera" />
                    <input
                      type="file"
                      ref={inputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                <h3 className="profile_content_dp_name">{data?.displayName}</h3>
              </div>
              {!isEditable && activeTab === 1 && (
                <CustomButton
                  text="Edit Profile"
                  clicked={() => setIsEditable(true)}
                  startIcon={<img src={Icons.edit} alt="edit" />}
                  sxProps={{
                    height: '44px',
                    fontWeight: 600,
                    fontSize: '16px',
                    bg: secondary.main
                  }}
                />
              )}
            </div>
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                '@media screen and (max-width: 1150px)': {
                  gap: 1,
                  flexWrap: 'wrap'
                }
              }}
            >
              <Box
                sx={{
                  pt: 3,
                  gap: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  '& > button': activeButtonStyle,
                  '@media screen and (max-width: 520px)': {
                    pt: 1.5,
                    '> button': {
                      width: '200px !important'
                    }
                  }
                }}
              >
                <CustomButton
                  text="View Profile"
                  clicked={() => setActiveTab(1)}
                  sxProps={{
                    height: '44px',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                  {...(activeTab !== 1 && {
                    variant: 'outlined',
                    tColor: primary.main,
                    borderColor: primary.main
                  })}
                />
                <CustomButton
                  text="Change Password"
                  clicked={() => {
                    setActiveTab(2);
                    setIsEditable(false);
                  }}
                  sxProps={{
                    height: '44px',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                  {...(activeTab !== 2 && {
                    variant: 'outlined',
                    tColor: primary.main,
                    borderColor: primary.main
                  })}
                />
                <CustomButton
                  text="2 Factor Authentication"
                  clicked={() => {
                    setActiveTab(3);
                    setIsEditable(false);
                  }}
                  sxProps={{
                    height: '44px',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                  {...(activeTab !== 3 && {
                    variant: 'outlined',
                    tColor: primary.main,
                    borderColor: primary.main
                  })}
                />
              </Box>
              <div className="profile_data" style={{ width: '100%' }}>
                {activeTab === 1 &&
                  (!isEditable ? (
                    <ViewProfile />
                  ) : (
                    <UpdateProfile setIsEditable={setIsEditable} />
                  ))}
                {activeTab === 2 && <ChangePassword />}
                {activeTab === 3 && <TwoFactorAuth />}
              </div>
            </Box>
          </div>
        </React.Fragment>
      )}
    </StyledDetailContent>
  );
};

export default Profile;

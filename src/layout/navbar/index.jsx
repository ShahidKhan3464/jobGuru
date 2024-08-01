import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import Sidebar from '../sidebar';
import Dialog from 'components/dialog';
import { StyledLgNavbar } from './style';
import Notifications from './notifications';
import LogoutContent from './logoutContent';
import { capitalizeFirstLetter } from 'utils';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from 'react-responsive';
import { customColors, primary } from 'theme/pallete';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Drawer, IconButton, MenuItem } from '@mui/material';
import { viewProfile } from 'provider/features/profile/profile.slice';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// Account data for the profile menu
const accountData = [
  {
    text: 'View Profile',
    path: '/profile',
    icon: Icons.user
  },
  {
    text: 'Logout',
    path: '/login',
    icon: Icons.accLogout
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 520 });
  const [openDrawer, setOpenDrawer] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showProfileData, setShowProfileData] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { data } = useSelector((state) => state.profile.viewProfile);
  const location = useLocation().pathname;
  const path = location.split('/')[1].includes('viewProfile')
    ? 'View Profile'
    : location.split('/')[1];

  // Toggle Drawer for mobile view
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    } else if (open) {
      setOpenDrawer(open);
    } else {
      setOpenDrawer(open);
    }
  };

  // Handle opening notifications menu
  // const handleShowNotifications = (e) => {
  //   setShowNotifications(true);
  //   // setAnchorEl(e.currentTarget);
  // };

  // Handle opening profile menu
  // const handleShowProfileData = (e) => {
  //   setAnchorEl(e.currentTarget);
  //   setShowProfileData(!showProfileData);
  // };

  // Handle closing the menus
  // const handleClose = () => {
  //   setAnchorEl(null);
  //   setShowProfileData(false);
  //   setShowNotifications(false);
  // };

  // Handle menu item click
  const handleItemClick = (item) => {
    if (item.text === 'Logout') {
      setDialogOpen(true);
    } else {
      navigate('/viewProfile');
    }
  };

  useEffect(() => {
    dispatch(viewProfile());
  }, [dispatch]);

  return (
    <StyledLgNavbar>
      {dialogOpen && (
        <Dialog open={dialogOpen} setOpen={setDialogOpen}>
          <LogoutContent setOpen={() => setDialogOpen(false)} />
        </Dialog>
      )}
      <div className="right">
        <div className="right_title">
          <h2>{path}</h2>
        </div>
        <div className="right_hamburger-menu">
          <IconButton
            size="large"
            sx={{ padding: 0 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
          <Sidebar isSidebarVisible={true} />
        </Drawer>
      </div>
      <div className="left">
        <div style={{ position: 'relative' }}>
          <IconButton
            size="large"
            sx={{
              padding: '6px',
              '@media screen and (max-width: 520px)': {
                padding: 0,
                '& > svg': {
                  width: '23px',
                  height: '23px'
                }
              }
            }}
            aria-label="notification"
            onClick={() => {
              setShowProfileData(false)
              setShowNotifications(!showNotifications)
            }}
          >
            <NotificationsNoneIcon fontSize="inherit" />
          </IconButton>
          {showNotifications && (
            <Notifications />
          )}
        </div>
        <div className="profile">
          <Avatar
            alt="avatar"
            src={data?.photo}
            sx={{
              background: primary.contrast,
              '@media screen and (max-width: 520px)': {
                width: '25px',
                height: '25px'
              }
            }}
          />
          <div
            className="detail"
            onClick={() => {
              setShowNotifications(false)
              setShowProfileData(!showProfileData)
            }}
          >
            <div>
              <p className="name">{data?.displayName}</p>
              <p className="role">{capitalizeFirstLetter(data?.role)}</p>
            </div>
            <img src={Icons.dropdown} alt="dropdown" />

            {showProfileData && (
              <div className='detail_content'>
                {accountData?.map((option, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleItemClick(option)}
                    sx={{
                      gap: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      lineHeight: '24px',
                      padding: '0 0 20px',
                      fontStyle: 'normal',
                      borderBottom: 'none',
                      fontFamily: 'Plus Jakarta Sans',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'inherit'
                      },
                      '&:focus-visible': {
                        backgroundColor: 'transparent'
                      },

                      ...(isMobile && {
                        padding: 0,
                        fontSize: '14px',
                        minHeight: '42px'
                      })
                    }}
                  >
                    <img src={option.icon} alt="icon" />
                    <span
                      style={{
                        color: option.text === 'Logout' && customColors.danger
                      }}
                    >
                      {option.text}
                    </span>
                  </MenuItem>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledLgNavbar>
  );
};

export default Navbar;

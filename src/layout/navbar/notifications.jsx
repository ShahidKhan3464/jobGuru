import React, { useEffect } from 'react';
import dayjs from 'dayjs-ext';
import { Icons } from 'assets';
import { StyledNotifications } from './style';
import { customColors, primary } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import { StyledLoadingContainer } from 'styles/global';
import { Badge, CircularProgress } from '@mui/material';
import relativeTime from 'dayjs-ext/plugin/relativeTime';
import {
  viewAllNotifications,
  clearAllNotifications,
  markAllAsReadNotifications
} from 'provider/features/notifications/notifications.slice';
dayjs.extend(relativeTime);

const Notifications = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state) => state.notifications.viewAll
  );
  const hasUnreadNotifications = data?.some(
    (notification) => !notification.markAsRead
  );

  const successCallback = () => {
    dispatch(viewAllNotifications({ role: 'ADMIN' }));
  };

  const handleNotifications = () => {
    if (hasUnreadNotifications) {
      dispatch(markAllAsReadNotifications({ successCallback }));
      return;
    }
    dispatch(clearAllNotifications({ successCallback }));
  };

  useEffect(() => {
    dispatch(viewAllNotifications());
  }, [dispatch]);

  return (
    <StyledNotifications>
      <div className="header">
        <h3>Notification</h3>
        {data?.length > 0 && (
          <p onClick={handleNotifications}>
            {hasUnreadNotifications ? ' Mark all as read' : 'Clear all'}
          </p>
        )}
      </div>

      {isLoading ? (
        <StyledLoadingContainer className="loader">
          <CircularProgress />
        </StyledLoadingContainer>
      ) : (
        !data?.length && (
          <div className="no-notifications">
            <img src={Icons.noNotifications} alt="no-notifications" />
            <span>No Notifications Here</span>
          </div>
        )
      )}

      {data?.length > 0 && (
        <div className="list">
          <ul
            style={{
              margin: '0',
              padding: '0',
              listStyleType: 'none'
            }}
          >
            {data.map((item) => {
              return (
                <li
                  key={item._id}
                  style={{
                    border: hasUnreadNotifications
                      ? `1px solid ${primary.contrast}`
                      : 'none',
                    background: hasUnreadNotifications
                      ? primary.contrast
                      : customColors.white,
                    borderBottom: hasUnreadNotifications
                      ? 'none'
                      : `1px solid ${customColors.paleGrey}`
                  }}
                >
                  <Badge
                    variant="dot"
                    invisible={!hasUnreadNotifications}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    sx={{
                      display: 'block',
                      '& .MuiBadge-badge': {
                        top: '5px',
                        left: '5px',
                        backgroundColor: customColors.success
                      }
                    }}
                  >
                    <img src={Icons.notificationBell} alt="notification-bell" />
                  </Badge>
                  <div className="text">
                    <h3>Notification</h3>
                    <p>{item.message}</p>{' '}
                  </div>
                  <span className="date">
                    {dayjs(item.receivingTime).fromNow()}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </StyledNotifications>
  );
};

export default Notifications;

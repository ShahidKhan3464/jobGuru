import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CustomButton from 'components/button';
import { StyledPopContent } from 'styles/global';
import CheckIcon from '@mui/icons-material/Check';
import { customColors, primary } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from 'provider/features/auth/auth.slice';

const ConfirmEmail = ({ email }) => {
  const payload = { email };
  const dispatch = useDispatch();
  const [time, setTime] = useState(59);
  const [isResendEmail, setIsResendEmail] = useState(false);
  const { isLoading } = useSelector((state) => state.auth.forgotPassword);

  // useEffect to start the timer when the component mounts
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  // Calculate minutes and seconds for the timer
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

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
          background: customColors.success
        }}
      >
        <CheckIcon sx={{ fontSize: '28px', color: customColors.white }} />
      </Box>
      <div className="text">
        <h3>
          {!isResendEmail
            ? 'Verification Link Sent Successfully'
            : 'Verification Link Resend'}
        </h3>
        <p>Please Check Your Email</p>
      </div>
      <CustomButton
        text="Resend Link"
        disabled={time > 0} // Disable button if timer is active
        loading={isLoading}
        clicked={() =>
          dispatch(
            forgotPassword({
              payload,
              successCallback: () => setIsResendEmail(true)
            })
          )
        }
        sxProps={{
          height: '44px',
          fontWeight: 600,
          fontSize: '16px',
          bg: primary.main
        }}
      />
      {/* Display timer for resend option */}
      {time > 0 && (
        <div className="resend-verification">
          <span>Resend verification link in</span>
          <span style={{ fontWeight: 600 }}> {formattedTime}</span>
        </div>
      )}
    </StyledPopContent>
  );
};

export default ConfirmEmail;

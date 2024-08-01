import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import { primary, secondary, customColors } from 'theme/pallete';

export const StyledTwoFactorAuth = styled.div`
  .top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    &_title {
      font-size: 22px;
      font-weight: 600;
      font-style: normal;
      line-height: normal;
      color: ${customColors.black};

      @media screen and (max-width: 520px) {
        font-size: 18px;
      }
    }
  }
  .subtitle {
    font-size: 16px;
    font-weight: 500;
    padding-top: 8px;
    font-style: normal;
    line-height: normal;
    color: ${primary.main};
  }

  .key-points {
    width: 100%;
    margin: 24px 0;
    max-width: 613px;
    padding: 15px 0px;
    border-radius: 12px;
    background: ${secondary.contrast};

    ul {
      margin: 0;

      li {
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        line-height: normal;
        padding-bottom: 10px;
        color: ${customColors.lightGrey};
      }
    }
  }

  form {
    .resend-otp {
      font-size: 14px;
      cursor: pointer;
      font-weight: 600;
      padding-top: 42px;
      font-style: normal;
      line-height: normal;
      font-family: Plus Jakarta Sans;

      @media screen and (max-width: 520px) {
        padding-top: 0px;
      }
    }
  }
`;

export const IOSSwitch = styled((props) => (
  <Switch
    {...props}
    disableRipple
    focusVisibleClassName=".Mui-focusVisible"
    sx={{ width: '36px', height: '20px', padding: '0' }}
  />
))(() => ({
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        border: 0,
        opacity: 1,
        backgroundColor: secondary.main
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7
    }
  },
  '& .MuiSwitch-thumb': {
    width: 16,
    height: 16,
    boxSizing: 'border-box'
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    borderRadius: 24 / 2,
    backgroundColor: customColors.paleGrey
  }
}));

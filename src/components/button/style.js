import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { customColors, primary } from 'theme/pallete';

export const StyledButton = styled(Button)((props) => ({
  width: '100%',
  boxShadow: 'unset',
  lineHeight: '20px',
  borderRadius: '8px',
  fontStyle: 'normal',
  textTransform: 'capitalize',
  fontFamily: 'Plus Jakarta Sans',
  color: `${props.isOutlined ? props.tColor : customColors.white}`,
  border: `${props.isOutlined ? `1px solid ${props.borderColor}` : 'none'}`,
  '&:hover': {
    border: `${props.isOutlined ? `1px solid ${props.borderColor}` : 'none'}`
  },
  '&:disabled': {
    color: customColors.white,
    backgroundColor: primary.lighter
  },

  '@media screen and (max-width: 520px)': {
    height: '36px',
    fontSize: '14px',
    width: 'fit-content !important',

    '.MuiButton-startIcon svg': {
      fontSize: '18px'
    }
  }
}));

import { styled } from '@mui/system';
import { customColors } from 'theme/pallete';
import TextField from '@mui/material/TextField';

export const StyledInputField = styled(TextField)((props) => ({
  '& .MuiOutlinedInput-input': {
    fontWeight: 400,
    padding: '12px',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '8px',
    fontStyle: 'normal',
    color: `${customColors.black}`,
    fontFamily: 'Plus Jakarta Sans',
    background: `${customColors.white}`,
    border: `1px solid ${props.error ? '#D02626' : `${customColors.grey}`}`,
    '@media screen and (max-width: 520px)': {
      padding: '8px',
      fontSize: '14px'
    },

    '&::placeholder': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      fontStyle: 'normal',
      fontFamily: 'Plus Jakarta Sans',
      color: `${customColors.lightGrey} !important`,

      '@media screen and (max-width: 520px)': {
        fontSize: '14px'
      }
    }
  },
  '& .MuiOutlinedInput-root': {
    padding: 0,
    '& fieldset': {
      display: 'none'
    }
  },
  '& .Mui-disabled': {
    background: '#F7F7F7',
    pointerEvents: 'none'
  },
  '& .MuiOutlinedInput-input[type="number"]::-webkit-inner-spin-button, & .MuiOutlinedInput-input[type="number"]::-webkit-outer-spin-button':
    {
      margin: 0,
      '-webkit-appearance': 'none'
    },
  '& .MuiOutlinedInput-input[type="number"]': {
    inputMode: 'numeric',
    '-moz-appearance': 'textfield'
  }
}));

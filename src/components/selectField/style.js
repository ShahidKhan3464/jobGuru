import { styled } from '@mui/system';
import { Select } from '@mui/material';
import { customColors } from 'theme/pallete';

export const StyledSelectField = styled(Select)((props) => ({
  '& .MuiSelect-select': {
    padding: '11px 14px',
    '@media screen and (max-width: 520px)': {
      padding: '8px'
    }
  },
  '&.MuiOutlinedInput-root': {
    fontWeight: 400,
    fontSize: '16px',
    marginTop: '4px',
    lineHeight: '24px',
    borderRadius: '8px',
    fontStyle: 'normal',
    color: `${customColors.black}`,
    fontFamily: 'Plus Jakarta Sans',
    background: `${customColors.white}`,
    border: `1px solid ${props.error ? '#D02626' : `${customColors.grey}`}`,
    '& fieldset': {
      display: 'none'
    },

    '@media screen and (max-width: 520px)': {
      fontSize: '14px'
    }
  },
  '& .MuiSelect-select:not([multiple])': {
    '& em': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      fontStyle: 'normal',
      fontFamily: 'Plus Jakarta Sans',
      color: `${customColors.lightGrey}`,

      '@media screen and (max-width: 520px)': {
        fontSize: '14px'
      }
    }
  }
}));

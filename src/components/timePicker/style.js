import { styled } from '@mui/system';
import { primary, customColors } from 'theme/pallete';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

export const StyledLabel = styled('label')({
  fontWeight: 500,
  fontSize: '16px',
  fontStyle: 'normal',
  lineHeight: 'normal',
  color: `${primary.main}`,
  fontFamily: 'Plus Jakarta Sans',

  '@media screen and (max-width: 520px)': {
    fontSize: '14px'
  }
});

export const StyledMobileTimePicker = styled(MobileTimePicker)({
  '& .MuiInputBase-root ': {
    borderRadius: '8px',
    border: `1px solid ${customColors.grey}`,

    '& input': {
      padding: '11.5px 14px'
    },

    '& fieldset': {
      display: 'none'
    }
  }
});

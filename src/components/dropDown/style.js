import styled from 'styled-components';
import Button from '@mui/material/Button';
import { customColors } from 'theme/pallete';

export const StyledButton = styled(Button)(({ selected }) => ({
  fontStyle: 'normal',
  fontSize: '14px !important',
  fontWeight: '600 !important',
  lineHeight: '20px !important',
  borderRadius: '4px !important',
  padding: '10px 16px !important',
  textTransform: 'none !important',
  fontFamily: 'Plus Jakarta Sans !important',
  border: `1px solid ${selected ? customColors.black : '#D0D5DD'} !important`,

  '@media screen and (max-width: 520px)': {
    fontSize: '11px !important',
    padding: '6px 10px !important'
  }
}));

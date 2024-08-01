import { styled } from '@mui/system';
import TableRow from '@mui/material/TableRow';
import { customColors, primary } from 'theme/pallete';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    padding: '16px',
    fontSize: '14px',
    fontWeight: '600',
    fontStyle: 'normal',
    color: primary.main,
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    borderTop: '#EDE9EC',
    borderBottom: '#EDE9EC',
    fontFamily: 'Plus Jakarta Sans',
    '@media screen and (max-width: 520px)': {
      fontSize: '12px'
    }
  },
  [`&.${tableCellClasses.body}`]: {
    padding: '16px',
    fontSize: '14px',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    borderBottom: 'none',
    color: `${customColors.black}`,
    fontFamily: 'Plus Jakarta Sans',
    '@media screen and (max-width: 520px)': {
      fontSize: '12px'
    }
  }
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F9F9F9'
  },
  '&:nth-of-type(odd)': {
    backgroundColor: `${customColors.white}`
  },
  '&:last-child th, &:last-child td': {
    border: 0
  }
}));

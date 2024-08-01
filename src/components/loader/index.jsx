import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { StyledLoadingContainer } from 'styles/global';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * LoadingRow component to display a loading indicator inside a table row.
 *
 * @example
 * // Example usage of LoadingRow component
 * <LoadingRow />
 */
const LoadingRow = () => {
  return (
    // Material-UI TableRow component
    <TableRow>
      <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      </TableCell>
    </TableRow>
  );
};

export default LoadingRow;

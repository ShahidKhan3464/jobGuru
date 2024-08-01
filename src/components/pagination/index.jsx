import React from 'react';
import Pagination from '@mui/material/Pagination';
import { StyledPaginationContainer } from './style';

/**
 * CustomPagination component for displaying pagination controls with rows per page selector.
 *
 * @param {number} page - The current page number.
 * @param {number} count - The total number of items.
 * @param {number} rowsPerPage - The number of items to display per page.
 * @param {function} onPageChange - Callback function to handle page change.
 * @param {function} onRowsPerPageChange - Callback function to handle rows per page change.
 *
 * @example
 * // Example usage of CustomPagination component
 * <CustomPagination
 *   page={currentPage}
 *   count={totalItemsCount}
 *   rowsPerPage={itemsPerPage}
 *   onPageChange={(event, newPage) => handlePageChange(newPage)}
 *   onRowsPerPageChange={(event) => handleRowsPerPageChange(event.target.value)}
 * />
 */
const CustomPagination = ({
  page,
  count,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange
}) => {
  return (
    <StyledPaginationContainer>
      <div className="left">
        <span>Show</span>
        <select value={rowsPerPage} onChange={onRowsPerPageChange}>
          {[5, 10, 20, 30].map((rowsPerPageOption) => (
            <option key={rowsPerPageOption} value={rowsPerPageOption}>
              {rowsPerPageOption}
            </option>
          ))}
        </select>
      </div>
      {/* Material-UI Pagination component */}
      <Pagination
        page={page}
        shape="rounded"
        variant="outlined"
        onChange={onPageChange}
        count={Math.ceil(count / rowsPerPage)}
      />
    </StyledPaginationContainer>
  );
};

// Export the CustomPagination component as the default export
export default CustomPagination;

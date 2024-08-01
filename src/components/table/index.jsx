import React from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { customColors } from 'theme/pallete';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import TableBody from '@mui/material/TableBody';
import LoaderContainer from 'components/loader';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { StyledTableCell, StyledTableRow } from './style';

const MuiTable = ({
  data,
  columns,
  payload,
  isLoading,
  setPayload,
  totalRecords,
  renderCellContent
}) => {
  const noResultsFound = totalRecords === 0;

  // Handler for changing the page in the pagination
  const handleChangePage = (event, newPage) => {
    if (newPage !== payload.page) {
      setPayload((prevData) => ({ ...prevData, page: newPage }));
    }
  };

  // Handler for changing the number of rows per page
  const handleChangeRowsPerPage = (e) => {
    const newPageSize = parseInt(e.target.value, 10);
    if (newPageSize !== payload?.pageSize) {
      setPayload((prevData) => ({
        ...prevData,
        page: 1,
        pageSize: newPageSize
      }));
    }
  };

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          borderRadius: '0',
          background: customColors.white
        }}
      >
        <Table>
          <TableHead sx={{ background: '#F9F9F9' }}>
            <TableRow>
              {columns.map((column, index) => (
                <StyledTableCell key={index}>{column.label}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <LoaderContainer />
            ) : (
              data?.map((item, index) => (
                <React.Fragment key={index}>
                  <StyledTableRow>
                    {columns.map((column, columnIndex) => (
                      <StyledTableCell key={columnIndex}>
                        {renderCellContent(item, column, index + 1)}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!noResultsFound && !isLoading && (
        <Pagination
          page={payload?.page}
          count={totalRecords}
          rowsPerPage={payload?.pageSize}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </React.Fragment>
  );
};

export default MuiTable;

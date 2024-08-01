import React, { useRef, useState, useEffect } from 'react';
import DataTable from 'components/table';
import { customColors } from 'theme/pallete';
import { CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_COLORS } from 'constants/statusColors';
import TableSearchHandler from 'components/tableSearchField';
import { viewAllBillings } from 'provider/features/billings/billings.slice';
import {
  payloadData,
  formattedDate,
  truncatedString,
  capitalizeFirstLetter
} from 'utils';
import {
  StyledStatus,
  StyledContentBox,
  StyledTableHeader,
  StyledLoadingContainer
} from 'styles/global';

const Billing = () => {
  const dispatch = useDispatch();
  const searchDebounceTimerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [payload, setPayload] = useState(payloadData);
  const { isLoading, data, totalRecords } = useSelector(
    (state) => state.billings.viewAll
  );

  const columns = [
    {
      label: 'Sr#',
      accessor: 'sr',
      render: (index) => (index <= 9 ? `0${index}` : index)
    },
    {
      label: 'Student Name',
      accessor: 'name',
      render: (item) =>
        truncatedString(capitalizeFirstLetter(item?.student?.fullName))
    },
    {
      label: 'Course Name',
      accessor: 'course',
      render: (item) =>
        truncatedString(capitalizeFirstLetter(item?.batch?.course?.name))
    },
    {
      label: 'Batch No#',
      accessor: 'batch',
      render: (item) => `No#${item?.batch?.batchNo}`
    },
    {
      label: 'Course Fees',
      accessor: 'fees',
      render: (item) => `$${item?.batch?.fee}`
    },
    {
      label: 'Course Status',
      accessor: 'status',
      render: (item) => (
        <StyledStatus
          color={STATUS_COLORS[item?.batch?.status]?.color}
          bg={STATUS_COLORS[item?.batch?.status]?.background}
        >
          {capitalizeFirstLetter(item?.batch?.status)}
        </StyledStatus>
      )
    },
    {
      label: 'Enrolled Date',
      accessor: 'enrolledDate',
      render: (item) => formattedDate(item?.enrolledDate)
    }
  ];

  // Handler search query for list courses
  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
    setPayload((prevData) => ({
      ...prevData,
      page: 1,
      pageSize: value ? 10000 : 5
    }));
  };

  const buildCondition = (searchValue) => {
    const condition = {};
    if (searchValue) {
      condition.fullName = searchValue;
      return condition;
    } else {
      return condition;
    }
  };

  const renderCellContent = (item, column, index) => {
    const value = item[column.accessor];
    return column.accessor === 'sr'
      ? column.render(index)
      : column.render
      ? column.render(item)
      : value;
  };

  const delayedAPICallForSearch = (updatedPayload) => {
    dispatch(viewAllBillings({ payload: updatedPayload }));
  };

  useEffect(() => {
    const updatedPayload = {
      ...payload,
      condition: buildCondition(searchQuery)
    };

    if (searchQuery) {
      clearTimeout(searchDebounceTimerRef.current);
      searchDebounceTimerRef.current = setTimeout(() => {
        delayedAPICallForSearch(updatedPayload);
      }, 1000);
    } else {
      dispatch(viewAllBillings({ payload: updatedPayload }));
    }

    return () => {
      clearTimeout(searchDebounceTimerRef.current);
    };
  }, [payload, dispatch]);

  return (
    <StyledContentBox>
      <StyledTableHeader>
        <h2>Billings List</h2>
        <div className="left">
          <TableSearchHandler
            handleSearchQueryChange={(value) => handleSearchQueryChange(value)}
          />
        </div>
      </StyledTableHeader>

      {isLoading ? (
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      ) : (
        !totalRecords && (
          <Box
            sx={{
              display: 'flex',
              minHeight: '100vh',
              alignItems: 'center',
              justifyContent: 'center',

              '& > p': {
                fontSize: '20px',
                fontWeight: '400',
                fontStyle: 'normal',
                lineHeight: 'normal',
                color: `${customColors.lightGrey}`
              }
            }}
          >
            <p>No Billings Found</p>
          </Box>
        )
      )}
      {!!totalRecords && !isLoading && (
        <DataTable
          data={data}
          payload={payload}
          columns={columns}
          isLoading={isLoading}
          setPayload={setPayload}
          totalRecords={totalRecords}
          renderCellContent={renderCellContent}
        />
      )}
    </StyledContentBox>
  );
};

export default Billing;

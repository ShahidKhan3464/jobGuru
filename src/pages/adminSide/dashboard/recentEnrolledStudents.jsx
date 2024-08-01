import React, { useEffect } from 'react';
import DataTable from 'components/table';
import { StyledStatus } from 'styles/global';
import { STATUS_COLORS } from 'constants/statusColors';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, truncatedString, capitalizeFirstLetter } from 'utils';
import { viewRecentEnrolledStudents } from 'provider/features/dashboard/dashboard.slice';

const RecentEnrolledStudents = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state) => state.dashboard.recentEnrolledStudents
  );

  const columns = [
    { label: 'Sr#', accessor: 'sr', render: (index) => `0${index}` },
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

  const renderCellContent = (item, column, index) => {
    const value = item[column.accessor];
    return column.accessor === 'sr'
      ? column.render(index)
      : column.render
      ? column.render(item)
      : value;
  };

  useEffect(() => {
    dispatch(viewRecentEnrolledStudents());
  }, [dispatch]);

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      renderCellContent={renderCellContent}
    />
  );
};

export default RecentEnrolledStudents;

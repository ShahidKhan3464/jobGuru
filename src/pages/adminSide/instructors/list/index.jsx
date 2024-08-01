import React, { useEffect, useRef, useState } from 'react';
import { Icons } from 'assets';
import Dialog from 'components/dialog';
import DataTable from 'components/table';
import MenuList from 'components/menuList';
import CustomButton from 'components/button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { primary, secondary } from 'theme/pallete';
import AddInstructorForm from './addInstructorForm';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_COLORS } from 'constants/statusColors';
import NoInstructorContent from './noInstructorContent';
import { Avatar, CircularProgress } from '@mui/material';
import TableSearchHandler from 'components/tableSearchField';
import DeleteInstructorContent from '../deleteInstructorContent';
import { viewAllInstructor } from 'provider/features/instructors/instructors.slice';
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

const actions = [
  { icon: Icons.user, text: 'View Profile', action: 'View Profile' },
  { icon: Icons.redTrash, text: 'Delete', action: 'Delete' }
];

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const searchDebounceTimerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [payload, setPayload] = useState(payloadData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLoading, data, totalRecords } = useSelector(
    (state) => state.instructor.viewAll
  );

  // Function to render instructor profile image based on status
  const getInstructorProfile = (photo) => {
    return (
      <div style={{ width: '40px', height: '40px' }}>
        <Avatar
          src={photo}
          alt="avatar"
          sx={{
            background: primary.contrast
          }}
        />
      </div>
    );
  };

  const columns = [
    {
      label: 'Instructor',
      accessor: 'fullName',
      render: (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getInstructorProfile(item?.profile?.photo)}
          {truncatedString(capitalizeFirstLetter(item.fullName))}
        </div>
      )
    },
    { label: 'Email', accessor: 'email' },
    {
      label: 'Invite Date',
      accessor: 'inviteDate',
      render: (item) => formattedDate(item.inviteDate)
    },
    {
      label: 'Joining Date',
      accessor: 'joinedDate',
      render: (item) =>
        item?.profile?.createdAt
          ? formattedDate(item?.profile?.createdAt)
          : 'N/A'
    },
    {
      label: 'Status',
      accessor: 'status',
      render: (item) => (
        <StyledStatus
          color={STATUS_COLORS[item.status]?.color}
          bg={STATUS_COLORS[item.status]?.background}
        >
          {capitalizeFirstLetter(item.status)}
        </StyledStatus>
      )
    },
    {
      label: 'Action',
      accessor: 'action',
      render: (item) => (
        <MenuList
          id={item._id}
          options={actions}
          handleTableMenu={handleTableMenu}
        />
      )
    }
  ];

  const renderCellContent = (item, column) => {
    const value = item[column.accessor];
    return column.render ? column.render(item) : value;
  };

  // Dialog content for delete and add instructor
  const dialogContent = id ? (
    <DeleteInstructorContent
      id={id}
      setPayload={setPayload}
      setOpen={(value) => setDialogOpen(value)}
    />
  ) : (
    <AddInstructorForm
      setPayload={setPayload}
      setOpen={(value) => setDialogOpen(value)}
    />
  );

  // Handler search query for list courses
  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
    setPayload((prevData) => ({
      ...prevData,
      page: 1,
      pageSize: value ? 10000 : 5
    }));
  };

  // Handler for menu options in the table
  const handleTableMenu = (id, option) => {
    if (option === 'Delete') {
      setId(id);
      setDialogOpen(true);
    } else if (option === 'View Profile') {
      navigate(`/instructor/viewDetails/${id}`);
    }
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

  const delayedAPICallForSearch = (updatedPayload) => {
    dispatch(viewAllInstructor({ payload: updatedPayload }));
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
      dispatch(viewAllInstructor({ payload: updatedPayload }));
    }

    return () => {
      clearTimeout(searchDebounceTimerRef.current);
    };
  }, [payload, searchQuery, dispatch]);

  return (
    <StyledContentBox>
      {dialogOpen && (
        <Dialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          maxWidth={!id && '660px'}
        >
          {dialogContent}
        </Dialog>
      )}

      <StyledTableHeader>
        <h2>Instructors List</h2>
        <div className="left">
          <TableSearchHandler
            handleSearchQueryChange={(value) => handleSearchQueryChange(value)}
          />
          <CustomButton
            startIcon={<AddIcon />}
            text="Add New Instructor"
            clicked={() => {
              setId(null);
              setDialogOpen(true);
            }}
            sxProps={{
              height: '36px',
              fontWeight: 600,
              fontSize: '14px',
              bg: secondary.main
            }}
          />
        </div>
      </StyledTableHeader>

      {isLoading ? (
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      ) : (
        !totalRecords && (
          <NoInstructorContent
            value={searchQuery}
            setOpen={(value) => setDialogOpen(value)}
          />
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

export default List;

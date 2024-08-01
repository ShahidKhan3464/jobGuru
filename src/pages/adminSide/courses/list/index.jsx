import React, { useEffect, useState, useRef } from 'react';
import CourseCard from './cards';
import { payloadData } from 'utils';
import { secondary } from 'theme/pallete';
import { StyledCoursesList } from './style';
import CustomButton from 'components/button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Pagination from 'components/pagination';
import { CircularProgress } from '@mui/material';
import NoCourseContent from './noCoursesContent';
import { useDispatch, useSelector } from 'react-redux';
import TableSearchHandler from 'components/tableSearchField';
import { viewAllCourses } from 'provider/features/courses/courses.slice';
import {
  StyledContentBox,
  StyledTableHeader,
  StyledLoadingContainer
} from 'styles/global';

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchDebounceTimerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [payload, setPayload] = useState(payloadData);
  const { isLoading, data, totalRecords } = useSelector(
    (state) => state.courses.viewAll
  );

  // Handler for changing the page in the pagination
  const handleChangePage = (event, newPage) => {
    if (newPage !== payload?.page) {
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
      condition.name = searchValue;
      return condition;
    } else {
      return condition;
    }
  };

  const delayedAPICallForSearch = (updatedPayload) => {
    dispatch(viewAllCourses({ payload: updatedPayload }));
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
      dispatch(viewAllCourses({ payload: updatedPayload }));
    }

    return () => {
      clearTimeout(searchDebounceTimerRef.current);
    };
  }, [payload, searchQuery, dispatch]);

  return (
    <StyledContentBox>
      <StyledTableHeader>
        <h2>Courses List</h2>
        <div className="left">
          <TableSearchHandler
            handleSearchQueryChange={(value) => handleSearchQueryChange(value)}
          />
          <CustomButton
            startIcon={<AddIcon />}
            text="Create New Course"
            clicked={() => navigate('/course/createCourse')}
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
        !totalRecords && <NoCourseContent value={searchQuery} />
      )}

      {!!totalRecords && !isLoading && (
        <React.Fragment>
          <StyledCoursesList>
            <div>
              {data?.map((item) => (
                <CourseCard key={item._id} item={item} />
              ))}
            </div>
          </StyledCoursesList>
          <Pagination
            page={payload?.page}
            count={totalRecords}
            rowsPerPage={payload?.pageSize}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </React.Fragment>
      )}
    </StyledContentBox>
  );
};

export default Courses;

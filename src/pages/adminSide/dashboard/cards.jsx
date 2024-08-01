import React, { useEffect } from 'react';
import { StyledCards } from './style';
import { customColors } from 'theme/pallete';
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardSummary } from 'provider/features/dashboard/dashboard.slice';

const Cards = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(
    (state) => state.dashboard.cardCounter
  );

  useEffect(() => {
    dispatch(getDashboardSummary());
  }, [dispatch]);

  return (
    <StyledCards>
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div className="card_detail">
            <p>Student Enrolled</p>
            <h3>{data?.totalEnrolledStudents}</h3>
          </div>
        </div>
      )}
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div className="card_detail">
            <p>Joined Instructor</p>
            <h3>{data?.totalJoinedInstructors}</h3>
          </div>
        </div>
      )}
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div className="card_detail">
            <p>Total Earnings</p>
            <h3>${data?.totalEarnings}</h3>
          </div>
        </div>
      )}
    </StyledCards>
  );
};

export default Cards;

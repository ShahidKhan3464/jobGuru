import React from 'react';
import Cards from './cards';
import Graph from './graph';
import ScheduleClasses from './calendar';
import RecentEnrolledStudents from './recentEnrolledStudents';
import { StyledHeading, StyledDashboardContent } from './style';

const Dashboard = () => {
  return (
    <StyledDashboardContent>
      <Cards />
      <Graph />
      <div className="table-container">
        <div className="header">
          <StyledHeading>Recent Enrolled Students</StyledHeading>
        </div>
        <RecentEnrolledStudents />
      </div>
      <ScheduleClasses />
    </StyledDashboardContent>
  );
};

export default Dashboard;

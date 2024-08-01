import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';
import Dropdown from 'components/dropDown';
import { customColors } from 'theme/pallete';
import Skeleton from '@mui/material/Skeleton';
import { Chart as ChartJS } from 'chart.js/auto';
import { StyledGraph, StyledHeading } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { viewMonthlyEnrolledStudents } from 'provider/features/dashboard/dashboard.slice';

const lgPadding = {
  top: 0,
  left: 20,
  right: 20,
  bottom: 10
};

const mdPadding = {
  top: 0,
  left: 7,
  right: 7,
  bottom: 5
};

const Graph = () => {
  const currentDate = dayjs();
  const dispatch = useDispatch();
  const currentYear = currentDate.year();
  const [width, setWidth] = useState(window.innerWidth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
    options: null
  });
  const { isLoading } = useSelector(
    (state) => state.dashboard.monthlyEnrolledStudents
  );

  window.addEventListener('resize', function () {
    setWidth(window.innerWidth);
  });

  const yearsArray = Array.from(
    { length: 2 },
    (_, index) => currentYear - 1 + index
  ).map((item) => {
    return { text: String(item), value: String(item) };
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    layout: {
      padding: width > 430 ? lgPadding : mdPadding
    },
    scales: {
      y: {
        stepSize: 200,
        suggestedMin: 0,
        suggestedMax: 1000,
        grid: { color: '#F2F4F7' },
        border: { display: false },
        ticks: {
          color: customColors.lightGrey,
          font: {
            size: 12,
            weight: '500',
            style: 'normal',
            lineHeight: 'normal',
            family: 'Plus Jakarta Sans'
          }
        }
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: customColors.lightGrey,
          font: {
            size: 12,
            weight: '500',
            style: 'normal',
            lineHeight: 'normal',
            family: 'Plus Jakarta Sans'
          }
        }
      }
    }
  };

  const genrateGraphData = (data) => {
    const monthLabels = [];
    const currentYear = currentDate.year();
    const currentMonth = currentDate.month();
    const endMonth = selectedYear < currentYear ? 11 : currentMonth;
    const enrolledStudentsArray = new Array(endMonth).fill(0);

    for (let i = 0; i <= endMonth; i++) {
      const monthIndex = i % 12;
      const year = selectedYear + Math.floor(i / 12);
      const monthName = dayjs().year(year).month(monthIndex).format('MMM');
      monthLabels.push(monthName);
    }

    data?.forEach((item) => {
      const monthIndex = monthLabels.findIndex((month) => {
        return item.month.toLowerCase() === month.toLowerCase();
      });

      if (monthIndex !== -1) {
        enrolledStudentsArray[monthIndex] = item.count;
      }
    });

    let minDataValue = Math.min(...enrolledStudentsArray);
    let maxDataValue = Math.max(...enrolledStudentsArray);
    let stepSize = Math.ceil((maxDataValue - minDataValue) / 5);

    if (minDataValue === 0 && maxDataValue === 0 && stepSize === 0) {
      minDataValue = maxDataValue = stepSize = 1;
    }

    const graphDatasets = {
      fill: true,
      tension: 0.5,
      borderWidth: 2,
      pointRadius: 0,
      data: enrolledStudentsArray,
      borderColor: 'rgba(1, 33,104, 1), rgba(1, 122, 187, 1)',
      backgroundColor: 'rgba(1, 121, 185, 0.3), rgba(1, 121, 185, 1)'
    };

    const updatedOptions = {
      ...options,
      scales: {
        ...options.scales,
        y: {
          stepSize,
          ...options.scales.y,
          suggestedMin: minDataValue,
          suggestedMax: maxDataValue
        }
      }
    };

    const updatedData = {
      labels: monthLabels,
      options: updatedOptions,
      datasets: [graphDatasets]
    };

    setGraphData(updatedData);
  };

  useEffect(() => {
    dispatch(
      viewMonthlyEnrolledStudents({
        year: selectedYear,
        successCallback: genrateGraphData
      })
    );
  }, [dispatch, selectedYear]);

  return (
    <StyledGraph>
      <div className="header">
        <StyledHeading>Enrolled Course students</StyledHeading>
        <Dropdown
          name=""
          options={yearsArray}
          value={selectedYear}
          handleFilterChange={(name, value) =>
            setSelectedYear(value ? value : currentDate.year())
          }
        />
      </div>
      {isLoading ? (
        <Skeleton
          sx={{
            height: '100px',
            transform: 'inherit',
            margin: '0 20px 20px',
            '@media screen and (max-width: 520px)': {
              margin: '0 12px 12px'
            }
          }}
        />
      ) : (
        <Line height={170} data={graphData} options={graphData.options} />
      )}
    </StyledGraph>
  );
};

export default Graph;

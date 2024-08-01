import React, { useState, useEffect, useRef, useCallback } from 'react';
import dayjs from 'dayjs';
import { Icons } from 'assets';
import Dropdown from 'components/dropDown';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import { useMediaQuery } from 'react-responsive';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { StyledLoadingContainer } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, ButtonGroup, CircularProgress } from '@mui/material';
import { viewLecturesSchedules } from 'provider/features/dashboard/dashboard.slice';
import {
  StyledHeading,
  StyledCalendar,
  StyledEventContent,
  StyledTimeSlotButton
} from './style';

const Calendar = () => {
  const currentDate = dayjs();
  const calendarRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentYear = currentDate.year();
  const [datesArray, setDatesArray] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 520 });
  const [scheduleLectures, setScheduleLectures] = useState();
  const { isLoading } = useSelector(
    (state) => state.dashboard.lecturesSchedules
  );
  const [schedule, setSchedule] = useState({
    selectedYear: currentDate.year(),
    selectedDate: currentDate.format('DD'),
    selectedMonth: currentDate.format('MM')
  });

  const yearsArray = Array.from(
    { length: 10 },
    (_, index) => currentYear - 1 + index
  ).map((item) => {
    return { text: String(item), value: String(item) };
  });

  // Generating an array of months for the select options using dayjs
  const monthsArray = Array.from({ length: 12 }, (_, monthIndex) => {
    const label = dayjs().month(monthIndex).format('MMM');
    const value = dayjs().month(monthIndex).format('MM');
    return { label, value };
  });

  const handleEventClick = (e) => {
    const courseId = e?.event?._def?.extendedProps?.batchId;
    if (courseId) {
      navigate(`/course/viewDetails/${courseId}`);
    }
  };

  const eventContentHandler = (eventInfo) => {
    const event = eventInfo.event._def.extendedProps;

    return (
      <StyledEventContent>
        <div className="course" onClick={handleEventClick}>
          <div>
            <h2 className="name">{event?.name}</h2>
            <p className="batch">
              Batch: #
              {event?.batchNo > 2 ? event?.batchNo : `0${event?.batchNo}`}
            </p>
          </div>
          <div>
            <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
              <img src={Icons.graduationHat} alt="graduation-hat" />
              <p className="same-prop">{event?.instuctorName}</p>
            </Box>
            <Box sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
              <img src={Icons.people} alt="people" />
              <p className="same-prop">{event?.totalStudents}</p>
            </Box>
          </div>
        </div>
      </StyledEventContent>
    );
  };

  const successCallback = (data) => {
    const formattedEvents = data?.map((lecture) => ({
      ...lecture,
      start: dayjs(lecture.startTime, 'YYYY-MM-DDTHH:mm:ss').toISOString(),
      end: dayjs(lecture.endTime, 'YYYY-MM-DDTHH:mm:ss').toISOString()
    }));
    setScheduleLectures(formattedEvents);
  };

  // Generating an array of dates for the select options using dayjs
  const getDatesForMonth = useCallback(() => {
    const { selectedYear, selectedMonth } = schedule;
    const numberOfDays = dayjs(
      `${selectedYear}-${selectedMonth}`,
      'YYYY-MM'
    ).daysInMonth();
    const dates = Array.from({ length: numberOfDays }, (_, index) =>
      dayjs(
        `${selectedYear}-${selectedMonth}-${String(index + 1).padStart(
          2,
          '0'
        )}`,
        'YYYY-MM-DD'
      ).format('DD')
    );
    setDatesArray(dates);
  }, [schedule.selectedYear, schedule.selectedMonth]);

  const updateCalendarDate = useCallback(() => {
    const { selectedYear, selectedMonth, selectedDate } = schedule;
    if (calendarRef.current) {
      calendarRef.current
        .getApi()
        .gotoDate(`${selectedYear}-${selectedMonth}-${selectedDate}`);
    }
  }, [scheduleLectures, schedule]);

  useEffect(() => {
    updateCalendarDate();
  }, [updateCalendarDate]);

  useEffect(() => {
    getDatesForMonth();
  }, [getDatesForMonth]);

  useEffect(() => {
    const { selectedYear, selectedDate, selectedMonth } = schedule;
    const date = `${selectedMonth}-${selectedDate}-${selectedYear}`;
    dispatch(viewLecturesSchedules({ date: date, successCallback }));
  }, [dispatch, schedule]);

  return (
    <StyledCalendar>
      <div className="header">
        <StyledHeading>Schedule Classes</StyledHeading>
        <Dropdown
          name="selectedYear"
          options={yearsArray}
          value={schedule.selectedYear}
          handleFilterChange={(name, value) => {
            setSchedule((prevState) => ({
              ...prevState,
              [name]: value ? value : currentDate.year()
            }));
          }}
        />
      </div>

      <ButtonGroup
        size="large"
        sx={{
          gap: '10px',
          width: '100%',
          borderRadius: 0,
          padding: '12px 0',
          borderTop: `1px solid ${customColors.paleGrey}`,

          '@media screen and (max-width: 630px)': {
            flexWrap: 'wrap'
          }
        }}
      >
        {monthsArray.map((month) => (
          <StyledTimeSlotButton
            key={month.value}
            active={schedule.selectedMonth === month.value}
            onClick={() => {
              setSchedule((prevState) => ({
                ...prevState,
                selectedMonth: month.value
              }));
            }}
          >
            {month.label}
          </StyledTimeSlotButton>
        ))}
      </ButtonGroup>

      <ButtonGroup
        size="large"
        sx={{
          gap: '7px',
          width: '100%',
          borderRadius: 0,
          flexWrap: 'wrap',
          padding: '12px 0 12px 4px',
          borderTop: `1px solid ${customColors.paleGrey}`,

          '& > button': {
            height: '25px !important',
            width: '25px !important',
            minWidth: '25px !important'
          }
        }}
      >
        {datesArray.map((date) => (
          <StyledTimeSlotButton
            key={date}
            active={schedule.selectedDate === date}
            onClick={() => {
              setSchedule((prevState) => ({
                ...prevState,
                selectedDate: date
              }));
            }}
          >
            {date}
          </StyledTimeSlotButton>
        ))}
      </ButtonGroup>

      {isLoading ? (
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      ) : (
        scheduleLectures?.length > 0 && (
          <div className="calendar">
            <FullCalendar
              height="100vh"
              droppable={true}
              ref={calendarRef}
              headerToolbar={false}
              initialView="timeGridDay"
              events={scheduleLectures}
              eventContent={eventContentHandler}
              eventClick={(e) => handleEventClick(e)}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            />
          </div>
        )
      )}

      {!isLoading && scheduleLectures?.length === 0 && (
        <Box
          sx={{
            py: '12px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <img
            src={Icons.noScheduleClasses}
            alt="noScheduleClasses"
            style={{
              ...(isMobile && {
                width: '280px'
              })
            }}
          />
          <span
            style={{
              fontSize: '20px',
              textAlign: 'center',
              color: customColors.lightGrey,
              fontFamily: 'Plus Jakarta Sans'
            }}
          >
            No Schedule Classes
          </span>
        </Box>
      )}
    </StyledCalendar>
  );
};

export default Calendar;

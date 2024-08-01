import React, { useMemo, useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { formattedDate } from 'utils';
import LectureForm from './lectureForm';
import SelectionList from './selectionList';
import { enqueueSnackbar } from 'notistack';
import duration from 'dayjs/plugin/duration';
import { StyledCourseContent } from './style';
import DatePicker from 'components/datePicker';
import TimePicker from 'components/timePicker';
import { StyledTimeSlotButton } from '../style';
import SelectField from 'components/selectField';
import { Box, ButtonGroup } from '@mui/material';
import { FieldErrorMessage } from 'styles/global';
import { useDispatch, useSelector } from 'react-redux';
import { customColors, secondary } from 'theme/pallete';
import { useLocation, useParams } from 'react-router-dom';
import { viewAllInstructor } from 'provider/features/instructors/instructors.slice';
dayjs.extend(duration);

// Arrays for predefined values
const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const noOfMonths = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  text: `${index + 1} Month${index !== 0 ? 's' : ''}`
}));

// Component for rendering time slot button
const TimeSlotButton = ({
  id,
  active,
  onClick,
  disabled,
  children,
  additionalStyles = false
}) => {
  return (
    <StyledTimeSlotButton
      key={id}
      active={active}
      onClick={onClick}
      disabled={disabled}
      additionalStyles={additionalStyles}
    >
      {children}
    </StyledTimeSlotButton>
  );
};

const CourseContent = ({ data, setData, setCurrentStep }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const [topics, setTopics] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [instructorId, setInstructorId] = useState('');
  const [courseTimeError, setCourseTimeError] = useState(null);
  const [courseTime, setCourseTime] = useState({ start: null, end: null });
  const [instructors, setInstructors] = useState({ all: [], selected: [] });
  const [duration, setDuration] = useState({
    inWeeks: null,
    inMonths: null,
    inHours: null
  });
  const [timeSlot, setTimeSlot] = useState({
    week: 1,
    day: '',
    date: null,
  });
  const [materials, setMaterials] = useState({
    selected: null,
    uploadedFiles: []
  });
  const [selectedValues, setSelectedValues] = useState({
    date: null,
    month: ''
  });
  const [formValues, setFormValues] = useState({
    title: '',
    topics: '',
    instructor: ''
  });
  const { data: allInstructors } = useSelector(
    (state) => state.instructor.viewAll
  );
  const path = location.split('/')[2];
  const { data: detailsData } = useSelector((state) => state.courses.details);
  const upcomingLecture =
    detailsData?.course?.lectures
      ?.find((lecture) => lecture.lectureNumber === timeSlot.week)
      ?.status?.toLowerCase() === 'upcoming';

  const handleDaySelectForCourseLecture = (day) => {
    const startDate = dayjs(selectedValues.date)
      .startOf('isoWeek')
      .add(timeSlot.week - 1, 'week');

    const selectedDayDate = startDate.day(
      day === 'Sunday' ? 7 : daysOfWeek.indexOf(day) + 1
    );

    setTimeSlot((prev) => ({
      ...prev,
      day,
      date: dayjs(selectedDayDate).format('YYYY-MM-DD')
    }));
  };

  // Days of the week rendered as buttons
  const days = useMemo(() => {
    return daysOfWeek.map((day) => {
      const isDisabled =
        (path === 'createCourse' &&
          timeSlot.week === 1 &&
          timeSlot.day !== day) ||
        (path === 'editCourse' && !upcomingLecture) ||
        timeSlot.week === 1;

      return (
        <TimeSlotButton
          disabled={isDisabled}
          id={day.toLowerCase()}
          onClick={() => handleDaySelectForCourseLecture(day)}
          additionalStyles={{
            fontWeight: '600 !important',
            borderRadius: '4px !important',
            padding: '12px 21px !important',
            textTransform: 'capitalize !important',
            backgroundColor: `${timeSlot.day === day ? secondary.main : secondary.contrast
              } !important`,
            color: `${timeSlot.day === day ? customColors.white : secondary.main
              } !important`
          }}
        >
          {day}
        </TimeSlotButton>
      );
    });
  }, [timeSlot.week, timeSlot.day, id, upcomingLecture]);

  // lectures of the course rendered as buttons
  const courseLectures = useMemo(() => {
    return Array.from({ length: duration.inWeeks }, (_, index) => {
      const weekNumber = index + 1;
      const isNextWeek = weekNumber > timeSlot.week;
      return (
        <TimeSlotButton
          id={weekNumber}
          active={timeSlot.week === weekNumber}
          disabled={isNextWeek && path === 'createCourse'}
          onClick={() => setTimeSlot(prev => ({ ...prev, week: weekNumber }))}
        >
          {weekNumber <= 9 ? `0${weekNumber}` : weekNumber}
        </TimeSlotButton>
      );
    });
  }, [duration.inWeeks, timeSlot.week]);

  // Function to calculate course end date
  const calculateCourseEndDate = (startDate, durationMonths) => {
    const startDateObject = new Date(startDate);
    const endDate = new Date(startDateObject);
    endDate.setMonth(startDateObject.getMonth() + durationMonths);
    return endDate;
  };

  // Function to handle form submission
  const handleSubmit = useCallback(
    ({ data, resetForm }) => {
      const date = dayjs(timeSlot?.date);
      const month = date.month();
      const day = date.format('DD');
      const year = date.format('YYYY');
      const formattedStartTime = dayjs(courseTime?.start).format('HH:mm:ss');
      const formattedEndTime = dayjs(courseTime?.end).format('HH:mm:ss');
      const [sHours, sMinutes, sSeconds] = formattedStartTime.split(':');
      const [eHours, eMinutes, eSeconds] = formattedEndTime.split(':');

      // Create a Dayjs object with the correct format
      const startTime = dayjs()
        .year(year)
        .month(month)
        .date(day)
        .hour(sHours)
        .minute(sMinutes)
        .second(sSeconds);

      const endTime = dayjs()
        .year(year)
        .month(month)
        .date(day)
        .hour(eHours)
        .minute(eMinutes)
        .second(eSeconds);

      const newLecture = {
        ...data,
        topics,
        endTime: endTime,
        day: timeSlot.day,
        date: timeSlot.date,
        startTime: startTime,
        instructorId: instructorId,
        lectureNumber: timeSlot.week,
        materials: materials.uploadedFiles,
        ...(path === 'editCourse' &&
          detailsData?.course?.lectures?.find(
            (lecture) => lecture.lectureNumber === timeSlot.week
          )?._id && {
          lectureId: detailsData?.course?.lectures?.find(
            (lecture) => lecture.lectureNumber === timeSlot.week
          )?._id
        })
      };

      if (duration.inWeeks > timeSlot.week) {
        resetForm();
        setTopics([]);
        setCourseTime({ start: null, end: null });
        setLectures((prev) => [...prev, newLecture]);
        setDuration({ ...duration, inHours: null });
        setTimeSlot({ day: '', date: null, week: timeSlot.week + 1 });
        setMaterials((prevState) => ({
          ...prevState,
          selected: null,
          uploadedFiles: []
        }));
        return;
      }

      if (duration.inWeeks === timeSlot.week) {
        const updatedLectureInfo = [...lectures, newLecture];
        const monthString = selectedValues.month === 1 ? 'Month' : 'Months';
        const payload = {
          lectures: updatedLectureInfo,
          noOfLectures: duration.inWeeks,
          startDate: dayjs(selectedValues.date).format('YYYY-MM-DD'),
          duration: `${selectedValues.month} ${monthString}`,
          endDate: dayjs(
            calculateCourseEndDate(selectedValues.date, selectedValues.month)
          ).format('YYYY-MM-DD'),
          instructors: instructors?.selected?.map((item) => ({
            _id: item._id,
            fullName: item.text
          }))
        };
        // dispatch(setCourseContent(payload));
        setData(prev => ({ ...prev, content: payload }))
        setCurrentStep((prev) => prev + 1);
      }
    },
    [
      path,
      topics,
      dispatch,
      courseTime,
      instructorId,
      timeSlot.week,
      timeSlot.date,
      setCurrentStep,
      selectedValues,
      duration.inWeeks,
      detailsData?.course,
      instructors.selected,
      materials.uploadedFiles
    ]
  );

  // Memoize the LectureForm component
  const MemoizedLectureForm = useMemo(() => {
    return (
      <LectureForm
        topics={topics}
        timeSlot={timeSlot}
        setTopics={setTopics}
        materials={materials}
        courseTime={courseTime}
        formValues={formValues}
        onSubmit={handleSubmit}
        instructors={instructors}
        setMaterials={setMaterials}
        selectedValues={selectedValues}
        setCurrentStep={setCurrentStep}
        upcomingLecture={upcomingLecture}
        setInstructorId={setInstructorId}
      />
    );
  }, [
    topics,
    timeSlot,
    materials,
    courseTime,
    formValues,
    instructors,
    handleSubmit,
    setMaterials,
    selectedValues,
    setCurrentStep,
    upcomingLecture,
    setInstructorId
  ]);

  // Function to format the hours difference
  const formatHoursDifference = (value) => {
    const number = parseFloat(value);
    return Number.isInteger(number) ? number : number.toFixed(2);
  };

  // Function to handle selection of month
  const handleSelectMonth = (value) => {
    setSelectedValues({ ...selectedValues, month: value });
    setDuration({ ...duration, inWeeks: value * 4 });
  };

  // Function to handle selection of date
  const handleSelectDate = (selectedDate) => {
    const date = dayjs(selectedDate).format('YYYY-MM-DD');
    const day = dayjs(date).format('dddd');
    setTimeSlot({ ...timeSlot, day, date: date });
    setSelectedValues({ ...selectedValues, date: selectedDate });
    const newEndDate = calculateCourseEndDate(
      selectedDate,
      selectedValues.month
    );
    setDuration({ ...duration, inMonths: newEndDate });
  };

  // Function to add instructor to the list
  const handleAddInstructors = (e) => {
    const { name, value } = e.target;
    const isSameInstructor = instructors.selected.some(
      (item) => item._id === value._id
    );

    if (instructors.selected.length >= 3) {
      enqueueSnackbar(
        'Cannot assign more than 3 instructors to a single course.',
        { variant: 'warning' }
      );
      return;
    }

    if (isSameInstructor) {
      enqueueSnackbar(
        'The selected instructor is already assigned to this course.',
        { variant: 'warning' }
      );
      return;
    }

    setInstructors({
      ...instructors,
      [name]: [...instructors.selected, { _id: value._id, text: value.text }]
    });
  };

  // Function to remove an instructor from the list
  const handleRemoveInstructor = (id) => {
    const updatedItems = instructors.selected.filter((item) => item._id !== id);
    setInstructors({
      ...instructors,
      selected: updatedItems
    });
  };

  // Function to handle change in start time
  const handleChangeStartTime = (time) => {
    const endTime = courseTime?.end
    // let hoursDifference = time.diff(endTime, 'hour');
    const hoursDifference = dayjs.duration(endTime?.diff(time)).asHours();

    // Check if the start time is after the end time
    if (endTime && time.isAfter(endTime)) {
      setDuration({ ...duration, inHours: null });
      setCourseTimeError('Start time cannot be after end time');
    } else if (endTime && time.isSame(endTime)) {
      setDuration({ ...duration, inHours: null });
      setCourseTimeError('Start time and end time cannot be the same');
    } else if (Math.abs(hoursDifference) > 6) {
      setDuration({ ...duration, inHours: null });
      setCourseTimeError('The class duration cannot exceed 6 hours');
      // setCourseTime({ ...courseTime, start: null });
    } else {
      setCourseTimeError(null);
      setCourseTime({ ...courseTime, start: time });
      setDuration({
        ...duration,
        inHours: endTime ? Math.abs(formatHoursDifference(hoursDifference)) : null
      });
    }
  };

  // Function to handle change in end time
  const handleChangeEndTime = (time) => {
    let adjustedEndTime = time;
    const startTime = courseTime?.start

    // Adjust end time if it's before start time or if it represents the next day
    if (time.isBefore(startTime)) {
      adjustedEndTime = time.add(1, 'day');
    }

    let hoursDifference = dayjs.duration(adjustedEndTime.diff(startTime)).asHours();

    if (isNaN(hoursDifference)) {
      setCourseTimeError('Invalid time selection')
      setDuration({ ...duration, inHours: null });
    } else if (hoursDifference === 0) {
      setDuration({ ...duration, inHours: null });
      setCourseTimeError('Start time and end time cannot be the same')
    } else if (hoursDifference > 6) {
      setDuration({ ...duration, inHours: null });
      setCourseTimeError('The class duration cannot exceed 6 hours')
    } else {
      setCourseTimeError(null);
      setCourseTime({ ...courseTime, end: time });
      setDuration({ ...duration, inHours: formatHoursDifference(hoursDifference) });
    }
  };

  // Function to update all instructors
  const updateAllInstructors = (allInstructors) => {
    setInstructors({
      ...instructors,
      all: allInstructors?.map((item) => ({
        _id: item._id,
        text: item.fullName
      }))
    });
  };

  useEffect(() => {
    if (!data?.content) {
      // Update instructors when route is createCourse
      if (!id && allInstructors) {
        updateAllInstructors(allInstructors);
        return;
      }

      // Update form data when route is editCourse or newBatch
      if (
        (id && path === 'editCourse' && detailsData?.course) ||
        (id && path === 'newBatch' && detailsData?.course)
      ) {
        const lecture = detailsData?.course?.lectures?.find(
          (item) => item.lectureNumber === timeSlot.week
        );

        if (lecture) {
          const startDate = dayjs(detailsData.course.startDate).toDate();
          const durationMonths = detailsData.course.duration.split(' ')[0];
          const endDate = calculateCourseEndDate(
            startDate,
            Number(durationMonths)
          );
          const adjustedEndTime = dayjs(lecture.endTime).isBefore(
            dayjs(lecture.startTime)
          )
            ? dayjs(lecture.endTime).add(12, 'hour')
            : dayjs(lecture.endTime);

          const hoursDifference = adjustedEndTime.diff(
            dayjs(lecture.startTime),
            'hour'
          );

          setTopics(lecture.topics || []);
          setInstructorId(lecture.instructor?._id || '');
          setCourseTime({ start: lecture.startTime, end: lecture.endTime });
          setTimeSlot((prev) => ({
            ...prev,
            day: lecture.day,
            date: dayjs(lecture.date).format('YYYY-MM-DD')
          }));
          setMaterials({
            uploadedFiles: lecture.materials,
            selected: lecture.materials.length ? lecture.materials : null
          });
          setDuration({
            inHours: hoursDifference,
            inWeeks: detailsData.course.noOfLectures,
            inMonths:
              path === 'editCourse' || selectedValues.date
                ? formattedDate(endDate)
                : null
          });
          setSelectedValues({
            month: Number(durationMonths),
            date:
              path === 'editCourse' ? startDate : selectedValues.date || null
          });
          setInstructors({
            ...instructors,
            all: allInstructors?.map((item) => ({
              _id: item._id,
              text: item.fullName
            })),
            selected:
              path === 'editCourse'
                ? detailsData.course.instructors.map((item) => ({
                  _id: item._id,
                  text: item.fullName
                }))
                : instructors.selected
          });
          setFormValues({
            ...formValues,
            title: lecture.title || '',
            instructor:
              path === 'newBatch'
                ? formValues.instructor
                : lecture.instructor?.fullName || ''
          });
        }
      }
    }
  }, [allInstructors, timeSlot.week]);

  useEffect(() => {
    // Update form data when back from next step
    if (data?.content) {
      const { content } = data;
      const lecture = content?.lectures?.find(
        (item) => item.lectureNumber === timeSlot.week
      );

      if (lecture) {
        const startDate = dayjs(content.startDate).toDate();
        const durationMonths = content.duration.split(' ')[0];
        const endDate = calculateCourseEndDate(
          startDate,
          Number(durationMonths)
        );
        const adjustedEndTime = lecture.endTime.isBefore(lecture.startTime)
          ? lecture.endTime.add(12, 'hour')
          : lecture.endTime;

        const hoursDifference = adjustedEndTime.diff(lecture.startTime, 'hour');

        setTopics(lecture.topics || []);
        setInstructorId(lecture.instructorId || '');
        setCourseTime({ start: lecture.startTime, end: lecture.endTime });
        setSelectedValues({ date: startDate, month: Number(durationMonths) });
        setTimeSlot((prev) => ({
          ...prev,
          date: lecture.date,
          day: lecture.day
        }));
        setMaterials({
          uploadedFiles: lecture.materials,
          selected: lecture.materials.length ? lecture.materials : null
        });
        setDuration({
          inHours: hoursDifference,
          inWeeks: content.noOfLectures,
          inMonths: formattedDate(endDate)
        });
        setFormValues({
          ...formValues,
          title: lecture.title || '',
          instructor: lecture.instructor || ''
        });
        setInstructors({
          all:
            allInstructors?.map((item) => ({
              _id: item._id,
              text: item.fullName
            })) || [],
          selected:
            content.instructors?.map((item) => ({
              _id: item._id,
              text: item.fullName
            })) || []
        });
      }
    }
  }, [timeSlot.week]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    dispatch(
      viewAllInstructor({
        payload: {
          condition: { status: 'ACTIVE' }
        }
      })
    );
  }, [dispatch]);

  return (
    <StyledCourseContent>
      <Box
        sx={{
          pb: 3,
          gap: '24px',
          display: 'flex',
          justifyContent: 'space-between',

          '& > div': {
            width: '100%'
          },
          '& > div .MuiButtonBase-root': {
            justifyContent: 'space-between'
          },

          '@media screen and (max-width: 768px)': {
            flexWrap: 'wrap'
          },

          '& .sm': {
            fontSize: '14px',
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: 'normal',
            fontFamily: 'Plus Jakarta Sans',
            color: `${customColors.darkGrey}`
          }
        }}
      >
        <div>
          <SelectField
            disabled={id}
            options={noOfMonths}
            label="Course Duration"
            value={selectedValues.month}
            placeholder="Select Course Duration"
            onChange={(e) => handleSelectMonth(e.target.value)}
          />
          {duration.inWeeks && (
            <span className="sm">
              This Course will be {duration.inWeeks} weeks long
            </span>
          )}
        </div>
        <div>
          <DatePicker
            label="Start Date"
            placeholder="Select start date"
            selectedDate={selectedValues.date}
            disabled={!selectedValues.month || path === 'editCourse'}
            onChange={(selectedDate) => handleSelectDate(selectedDate)}
          />
          {duration.inMonths && (
            <span className="sm">
              This Course will end on {formattedDate(duration.inMonths)}
            </span>
          )}
        </div>
      </Box>
      <SelectField
        name="selected"
        label="Instructors"
        options={instructors.all}
        placeholder="Select instructors"
        disabled={path === 'editCourse'}
        onChange={(e) => handleAddInstructors(e)}
      />
      {instructors.selected.length > 0 && (
        <SelectionList
          items={instructors.selected}
          disabled={path === 'editCourse'}
          onRemoveItem={handleRemoveInstructor}
        />
      )}
      <div className="box_container">
        <div className="box_container_title">
          <h3>Weeks</h3>
        </div>
        {selectedValues.month && (
          <ButtonGroup
            size="large"
            sx={{
              gap: '5px',
              borderRadius: 0,
              overflowX: 'auto',
              padding: '12px 5px',
              width: 'calc(100% - 10px)',
              justifyContent: 'space-between',
              borderTop: `1px solid ${customColors.grey}`,
              borderBottom: `1px solid ${customColors.grey}`,

              '&::-webkit-scrollbar': {
                width: '4px',
                height: '4px'
              },

              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                background: `${customColors.grey}`
              },

              '& > button': {
                height: '42px'
              }
            }}
          >
            {courseLectures}
          </ButtonGroup>
        )}
        <div className="box_container_form">
          <div className="box_container_form_days">
            <h3>Select Day</h3>
            <ButtonGroup
              size="large"
              sx={{
                gap: '20px',
                width: '100%',
                borderRadius: 0,
                '& > button': {
                  width: '100%'
                },

                '@media screen and (max-width: 1200px)': {
                  flexWrap: 'wrap',
                  '& > button': {
                    width: 'auto'
                  }
                },
                '@media screen and (max-width: 1023px)': {
                  flexWrap: 'nowrap',
                  '& > button': {
                    width: '100%'
                  }
                },
                '@media screen and (max-width: 768px)': {
                  flexWrap: 'wrap',
                  '& > button': {
                    width: 'auto'
                  }
                }
              }}
            >
              {days}
            </ButtonGroup>
          </div>
          <div className="box_container_form_timePicker">
            <TimePicker
              label="Start Time"
              placeholder="Enter start time"
              onChange={(time) => handleChangeStartTime(time)}
              value={courseTime.start && dayjs(courseTime.start)}
              disabled={path === 'editCourse' && !upcomingLecture}
            // onChange={(time) => setCourseTime({ ...courseTime, start: time })}
            />
            <div>
              <TimePicker
                label="End Time"
                placeholder="Enter end time"
                onChange={(time) => handleChangeEndTime(time)}
                value={courseTime.end && dayjs(courseTime.end)}
                disabled={path === 'editCourse' && !upcomingLecture}
              />
              {duration.inHours && (
                <span className="sm">
                  This class will be {duration.inHours}{' '}
                  {duration.inHours === 1 ? 'hour' : 'hours'} long
                </span>
              )}
              {courseTimeError && (
                <FieldErrorMessage>{courseTimeError}</FieldErrorMessage>
              )}
            </div>
          </div>
          {MemoizedLectureForm}
        </div>
      </div>
    </StyledCourseContent>
  );
};

export default CourseContent;

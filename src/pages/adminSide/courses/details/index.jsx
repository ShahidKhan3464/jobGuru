import React, { useEffect, useState } from 'react';
import { formatBytes } from 'utils';
import CustomButton from 'components/button';
import { useMediaQuery } from 'react-responsive';
import { customColors, primary } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_COLORS } from 'constants/statusColors';
import { useNavigate, useParams } from 'react-router-dom';
import StopEnrollmentContent from './stopEnrollmentContent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { courseDetails } from 'provider/features/courses/courses.slice';
import { ButtonGroup, CircularProgress, Dialog, IconButton } from '@mui/material';
import {
  formattedDate,
  formattedTimeToShow,
  capitalizeFirstLetter
} from 'utils';
import {
  StyledStatus,
  StyledContentBox,
  StyledLoadingContainer
} from 'styles/global';
import {
  StyledCoursePreview,
  StyledTimeSlotButton,
  StyledCourseDetailsHeader
} from '../style';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lectureNo, setLectureNo] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 520 });
  const [dialogOpen, setDialogOpen] = useState(false)
  const { isLoading, data } = useSelector((state) => state.courses.details);
  const course = data?.course;
  const lecture = course?.lectures?.find(
    (item) => item.lectureNumber === lectureNo
  );

  const checkFileName = (item) => {
    const extension = item.name.split('.').pop().toLowerCase();
    if (extension !== 'pdf' && extension !== 'document') {
      return (
        <div className="cards_card_img">
          <img src={item.url} alt={item.name} />
        </div>
      );
    }
  };

  useEffect(() => {
    dispatch(courseDetails({ courseId: id }));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <StyledContentBox>
        <StyledLoadingContainer>
          <CircularProgress />
        </StyledLoadingContainer>
      </StyledContentBox>
    );
  }

  return (
    <StyledContentBox
      style={{
        padding: "24px",
        ...(isMobile && {
          padding: "12px",
        }),
      }}
    >
      {dialogOpen && (
        <Dialog open={dialogOpen} setOpen={setDialogOpen}>
          <StopEnrollmentContent
            courseId={course?.course?._id}
            setOpen={value => setDialogOpen(value)}
          />
        </Dialog>
      )}
      <StyledCourseDetailsHeader>
        <div className="left">
          <IconButton size="large" onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </IconButton>
          <h2>Course Detail</h2>
        </div>
        <div className="right">
          <CustomButton
            text="Edit Course"
            variant="outlined"
            tColor={primary.main}
            borderColor={primary.main}
            clicked={() => navigate(`/course/editCourse/${id}`)}
            sxProps={{
              width: '140px',
              height: "48px",
              fontWeight: 600,
              fontSize: "16px",
            }}
          />
          <CustomButton
            variant="outlined"
            tColor={primary.main}
            text="Stop Enrollment"
            borderColor={primary.main}
            clicked={() => setDialogOpen(true)}
            disabled={course?.course.enrollment_stopped}
            sxProps={{
              width: '165px',
              height: "48px",
              fontWeight: 600,
              fontSize: "16px",
            }}
          />
          <CustomButton
            text="Start new Batch"
            clicked={() => navigate(`/course/newBatch/${id}`)}
            sxProps={{
              width: '163px',
              height: "48px",
              fontWeight: 600,
              fontSize: "16px",
              bg: primary.main,
            }}
          />
        </div>
      </StyledCourseDetailsHeader>
      <StyledCoursePreview>
        <div className="course_preview">
          <div className="course_preview_thumbnail">
            <h3 className="label">Course Thumbnail</h3>
            <div className="course_preview_thumbnail_img">
              <img src={course?.course?.thumbnail?.url} alt="thumbnail" />
            </div>
          </div>

          <div className="course_preview_information">
            <div className="course_preview_information_row">
              <div>
                <h3 className="label">Course Name</h3>
                <p>{course?.course?.name || "N/A"}</p>
              </div>

              <div className="instructor">
                <h3 className="label">Course Instructor</h3>
                <div>
                  {course?.instructors?.map(item => {
                    return <span key={item._id}>{item.fullName}</span>
                  })}
                </div>
              </div>
            </div>

            <div className="course_preview_information_row">
              <div>
                <h3 className="label">Course Duration</h3>
                <p>{course?.duration || "N/A"}</p>
              </div>
              <div style={{ width: "35%" }}>
                <h3 className="label">Course Fees</h3>
                <p>{course?.fee ? `$${course?.fee}` : "N/A"}</p>
              </div>
              <div>
                <h3 className="label">Batch No#</h3>
                <p>{course?.batchNo || "N/A"}</p>
              </div>
            </div>

            <div className="course_preview_information_row">
              <div>
                <h3 className="label">Start Date</h3>
                <p>{course?.startDate ? formattedDate(course?.startDate) : "N/A"}</p>
              </div>
              <div style={{ width: "35%" }}>
                <h3 className="label">End Date</h3>
                <p>{course?.endDate ? formattedDate(course?.endDate) : "N/A"}</p>
              </div>
              <div>
                <h3 className="label">Status</h3>
                <p>
                  <StyledStatus
                    color={STATUS_COLORS[course?.status]?.color}
                    bg={STATUS_COLORS[course?.status]?.background}
                  >
                    {capitalizeFirstLetter(course?.status)}
                  </StyledStatus>
                </p>
              </div>
            </div>
          </div>

          {course?.feeType === "INSTALLMENTS" && (
            <div className="course_preview_installment">
              <h3 className="label">Installment Plan</h3>
              <div>
                {course?.installments?.map((installment, index) => (
                  <React.Fragment key={index}>
                    <p>{installment.name}</p>
                    {index !== course?.installments?.length - 1 && ","}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          <div className="course_preview_outcomes">
            <h3 className="label">Course Outcomes</h3>
            <ul>
              {course?.course?.outcomes?.map((value, index) => {
                return <li key={index}>{value}</li>
              })}
            </ul>
          </div>

          <div className="course_preview_description">
            <h3 className="label">Course Description</h3>
            <p>{course?.course?.description}</p>
          </div>

          <div className="course_preview_weekDays">
            <h3 className="label">Week</h3>
            <ButtonGroup
              size="large"
              sx={{
                gap: "3px",
                marginTop: "4px",
                overflowX: "auto",
                padding: "12px 5px",
                borderRadius: "4px",
                width: "calc(100% - 10px)",
                justifyContent: "space-between",
                border: `1px solid ${customColors.grey}`,

                "&::-webkit-scrollbar": {
                  width: "4px",
                  height: "4px",
                },

                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "10px",
                  background: `${customColors.grey}`,
                },

                "& > button": {
                  height: "42px",
                },
              }}
            >
              {Array.from({ length: course?.noOfLectures }, (_, index) => {
                return (
                  <StyledTimeSlotButton
                    key={index}
                    active={lectureNo === index + 1}
                    onClick={() => setLectureNo(index + 1)}
                  >
                    {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                  </StyledTimeSlotButton>
                )
              })}
            </ButtonGroup>
          </div>

          <div className="course_preview_classDay">
            <h3 className="label">Class Day</h3>
            <p>{lecture?.day || "N/A"}</p>
          </div>

          <div className="course_preview_information">
            <div className="course_preview_information_row">
              <div>
                <h3 className="label">Start Time</h3>
                <p>{formattedTimeToShow(lecture?.startTime) || "N/A"}</p>
              </div>
              <div>
                <h3 className="label">End Time</h3>
                <p>{formattedTimeToShow(lecture?.endTime) || "N/A"}</p>
              </div>
            </div>
            <div className="course_preview_information_row">
              <div>
                <h3 className="label">Class Title</h3>
                <p>{lecture?.title || "N/A"}</p>
              </div>
              <div className="topics">
                <h3 className="label">Class Topics</h3>
                <div>
                  {lecture?.topics?.map((topic, index) => {
                    return <span key={index}>{topic}</span>
                  })}
                </div>
              </div>
            </div>
            <div className="course_preview_information_row">
              <div>
                <h3 className="label">Instructor</h3>
                <p>{lecture?.instructor?.fullName || "N/A"}</p>
              </div>
              <div>
                <h3 className="label">Class Materials</h3>
                <div className="cards">
                  {lecture?.materials?.map((item, index) => {
                    return (
                      <a
                        download
                        key={index}
                        href={item?.url}
                        className="cards_card"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {checkFileName(item)}
                        <div className="cards_card_content">
                          <h6>{capitalizeFirstLetter(item.name)}</h6>
                          <p>{formatBytes(item.size)}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledCoursePreview>
    </StyledContentBox>
  )
};

export default Details;

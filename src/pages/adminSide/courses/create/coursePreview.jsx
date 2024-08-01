import React, { useState } from 'react';
import { ButtonGroup } from '@mui/material';
import CustomButton from 'components/button';
import { customColors, primary } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import { StyledCoursePreview, StyledTimeSlotButton } from '../style';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { capitalizeFirstLetter, formatBytes, formattedTimeToShow } from 'utils';
import {
  createCourse,
  updateCourse,
  startNewBatch,
} from 'provider/features/courses/courses.slice';

const CoursePreview = ({ data, setData, setCurrentStep }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [lectureNo, setLectureNo] = useState(1);
  const { data: detailsData } = useSelector((state) => state.courses.details);
  const { isLoading: createCourseLoading } = useSelector(
    (state) => state.courses.create
  );
  const { isLoading: updateCourseLoading } = useSelector(
    (state) => state.courses.update
  );
  const { isLoading: startNewBatchLoading } = useSelector(
    (state) => state.courses.newBatch
  );
  const { information, content, payment } = data;
  const lecture = content?.lectures?.find(
    (item) => item.lectureNumber === lectureNo
  );
  const path = location.split('/')[2];

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

  const successCallback = () => {
    setCurrentStep(1);
    setData({ information: null, content: null, payment: null })
    navigate('/courses');
  };

  const handleSaveAndPublishCourse = () => {
    const { information, content, payment } = data;
    const { fee, feeType, installments } = payment;
    const { name, description, outcomes, thumbnail } = information;
    const {
      endDate,
      duration,
      lectures,
      startDate,
      instructors,
      noOfLectures
    } = content;

    const payload = {
      fee,
      name,
      feeType,
      outcomes,
      thumbnail,
      description,
      duration,
      startDate,
      endDate,
      noOfLectures,
      installments,
      ...(id && { courseId: detailsData?.course?.course?._id }),
      instructors: instructors.map((item) => item._id),
      lectures: lectures.map((item) => ({
        ...item,
        startTime: item.startTime.toISOString(),
        endTime: item.endTime.toISOString()
      }))
    };
    const batchPayload = {
      fee,
      feeType,
      endDate,
      duration,
      startDate,
      installments,
      noOfLectures,
      batchNo: detailsData?.course?.batchNo + 1,
      courseId: detailsData?.course?.course?._id,
      instructors: instructors.map((item) => item._id),
      lectures: lectures.map((item) => ({
        ...item,
        startTime: item.startTime.toISOString(),
        endTime: item.endTime.toISOString()
      }))
    };

    if (id && path === 'editCourse') {
      dispatch(updateCourse({ payload, successCallback }));
      return;
    }
    if (id && path === 'newBatch') {
      dispatch(startNewBatch({ payload: batchPayload, successCallback }));
      return;
    }
    dispatch(createCourse({ payload, successCallback }));
  };

  return (
    <StyledCoursePreview>
      <div className="course_preview">
        <div className="course_preview_thumbnail">
          <h3 className="label">Course Thumbnail</h3>
          <div className="course_preview_thumbnail_img">
            <img src={information?.thumbnail?.url} alt="thumbnail" />
          </div>
        </div>

        <div className="course_preview_information">
          <div className="course_preview_information_row">
            <div>
              <h3 className="label">Course Name</h3>
              <p>{information?.name || 'N/A'}</p>
            </div>

            <div className="instructor">
              <h3 className="label">Course Instructor</h3>
              <div>
                {content?.instructors?.map((item) => {
                  return <span key={item._id}>{item.fullName}</span>;
                })}
              </div>
            </div>
          </div>

          <div className="course_preview_information_row">
            <div>
              <h3 className="label">Course Duration</h3>
              <p>{content?.duration || 'N/A'}</p>
            </div>
            <div>
              <h3 className="label">Course Fees</h3>
              <p>{payment?.fee ? `$${payment?.fee}` : 'N/A'}</p>
            </div>
          </div>

          <div className="course_preview_information_row">
            <div>
              <h3 className="label">Start Date</h3>
              <p>{content?.startDate ? content?.startDate : 'N/A'}</p>
            </div>
            <div>
              <h3 className="label">End Date</h3>
              <p>{content?.endDate ? content?.endDate : 'N/A'}</p>
            </div>
          </div>
        </div>

        {payment?.feeType === 'INSTALLMENTS' && (
          <div className="course_preview_installment">
            <h3 className="label">Installment Plan</h3>
            <div>
              {payment?.installments?.map((installment, index) => (
                <React.Fragment key={index}>
                  <p>{installment.name}</p>
                  {index !== payment?.installments?.length - 1 && ','}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="course_preview_outcomes">
          <h3 className="label">Course Outcomes</h3>
          <ul>
            {information?.outcomes?.map((value, index) => {
              return <li key={index}>{value}</li>;
            })}
          </ul>
        </div>

        <div className="course_preview_description">
          <h3 className="label">Course Description</h3>
          <p>{information?.description}</p>
        </div>

        <div className="course_preview_weekDays">
          <h3 className="label">Week</h3>
          <ButtonGroup
            size="large"
            sx={{
              gap: '3px',
              marginTop: '4px',
              overflowX: 'auto',
              padding: '12px 5px',
              borderRadius: '4px',
              width: 'calc(100% - 10px)',
              justifyContent: 'space-between',
              border: `1px solid ${customColors.grey}`,

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
            {Array.from({ length: content?.noOfLectures }, (_, index) => {
              return (
                <StyledTimeSlotButton
                  key={index}
                  active={lectureNo === index + 1}
                  onClick={() => setLectureNo(index + 1)}
                >
                  {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                </StyledTimeSlotButton>
              );
            })}
          </ButtonGroup>
        </div>

        <div className="course_preview_classDay">
          <h3 className="label">Class Day</h3>
          <p>{lecture?.day || 'N/A'}</p>
        </div>

        <div className="course_preview_information">
          <div className="course_preview_information_row">
            <div>
              <h3 className="label">Start Time</h3>
              <p>{formattedTimeToShow(lecture?.startTime) || 'N/A'}</p>
            </div>
            <div>
              <h3 className="label">End Time</h3>
              <p>{formattedTimeToShow(lecture?.endTime) || 'N/A'}</p>
            </div>
          </div>
          <div className="course_preview_information_row">
            <div>
              <h3 className="label">Class Title</h3>
              <p>{lecture?.title || 'N/A'}</p>
            </div>
            <div className="topics">
              <h3 className="label">Class Topics</h3>
              <div>
                {lecture?.topics?.map((topic, index) => {
                  return <span key={index}>{topic}</span>;
                })}
              </div>
            </div>
          </div>
          <div className="course_preview_information_row">
            <div>
              <h3 className="label">Instructor</h3>
              <p>{lecture?.instructor || 'N/A'}</p>
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
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="course_preview_btn-container">
          <CustomButton
            text="Previous"
            variant="outlined"
            tColor={primary.main}
            borderColor={primary.main}
            clicked={() => setCurrentStep((prev) => prev - 1)}
            sxProps={{
              height: '48px',
              fontWeight: 600,
              fontSize: '16px'
            }}
          />
          <CustomButton
            text="Save & Publish"
            clicked={handleSaveAndPublishCourse}
            loading={
              createCourseLoading || updateCourseLoading || startNewBatchLoading
            }
            sxProps={{
              height: '48px',
              fontWeight: 600,
              fontSize: '16px',
              bg: primary.main
            }}
          />
        </div>
      </div>
    </StyledCoursePreview>
  );
};

export default CoursePreview;

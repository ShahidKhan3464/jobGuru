import React from 'react';
import { truncatedString } from 'utils';
import { secondary } from 'theme/pallete';
import CustomButton from 'components/button';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  IconButton,
  CardActions,
  CardContent,
  LinearProgress
} from '@mui/material';

const Cards = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card key={item._id} sx={{ width: '100%', maxWidth: 320 }}>
      <CardMedia
        sx={{ height: 180 }}
        title="green iguana"
        image={item?.course?.thumbnail?.url}
      />
      <CardContent sx={{ padding: '16px 12px' }}>
        <div className="title">
          <h2>{truncatedString(item.course?.name)}</h2>
          <IconButton
            size="large"
            sx={{
              padding: 0,
              width: '32px',
              height: '32px',
              borderRadius: '4px',
              background: secondary.contrast
            }}
            onClick={() => navigate(`/course/editCourse/${item?._id}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_1432_14364)">
                <path
                  d="M9.16602 3.33417H5.66602C4.26588 3.33417 3.56582 3.33417 3.03104 3.60666C2.56063 3.84634 2.17818 4.22879 1.9385 4.6992C1.66602 5.23398 1.66602 5.93404 1.66602 7.33417V14.3342C1.66602 15.7343 1.66602 16.4344 1.9385 16.9691C2.17818 17.4396 2.56063 17.822 3.03104 18.0617C3.56582 18.3342 4.26588 18.3342 5.66602 18.3342H12.666C14.0661 18.3342 14.7662 18.3342 15.301 18.0617C15.7714 17.822 16.1538 17.4396 16.3935 16.9691C16.666 16.4344 16.666 15.7343 16.666 14.3342V10.8342M6.66599 13.3342H8.06145C8.4691 13.3342 8.67292 13.3342 8.86474 13.2881C9.0348 13.2473 9.19737 13.18 9.34649 13.0886C9.51468 12.9855 9.65881 12.8414 9.94706 12.5531L17.916 4.58417C18.6064 3.89382 18.6064 2.77453 17.916 2.08417C17.2257 1.39382 16.1064 1.39382 15.416 2.08417L7.44704 10.0531C7.15879 10.3414 7.01466 10.4855 6.91159 10.6537C6.82021 10.8028 6.75287 10.9654 6.71204 11.1355C6.66599 11.3273 6.66599 11.5311 6.66599 11.9387V13.3342Z"
                  stroke="#0179B9"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1432_14364">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </IconButton>
        </div>
        <div className="details">
          <span>{item?.duration}.</span>
          <span>{item.totalStudents} Enrolled.</span>
          <span>Batch #{item.batchNo}.</span>

          <div
            className={`details_progressbar ${
              item.courseProgress === 100 ? 'completed' : 'in-progress'
            }`}
          >
            <LinearProgress variant="determinate" value={item.courseProgress} />
            <p className="details_progressbar_value">
              {item.courseProgress.toFixed(0)}% Completed
            </p>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <CustomButton
          text="View Details"
          clicked={() => navigate(`/course/viewDetails/${item?._id}`)}
          sxProps={{
            height: '44px',
            fontWeight: 500,
            fontSize: '16px',
            bg: secondary.main
          }}
        />
      </CardActions>
    </Card>
  );
};

export default Cards;

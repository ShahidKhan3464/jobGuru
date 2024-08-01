import { Button } from '@mui/material';
import styled from 'styled-components';
import { primary, secondary, customColors } from 'theme/pallete';

export const StyledCoursePreview = styled.div`
  width: 100%;
  margin-top: 10px;
  .label {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    font-style: normal;
    color: ${customColors.black};
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    font-style: normal;
    color: ${customColors.lightGrey};
  }

  .course_preview {
    &_thumbnail_img {
      height: 400px;
      padding-bottom: 20px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }
    }

    &_information {
      &_row {
        gap: 25px;
        display: flex;
        flex-wrap: wrap;
        padding-top: 20px;

        @media screen and (max-width: 520px) {
          gap: 12px;
          padding-top: 10px;
        }

        > div:first-child {
          width: 30%;
          @media screen and (max-width: 520px) {
            width: 100%;
          }
        }

        .cards {
          gap: 16px;
          display: flex;
          margin-top: 8px;
          flex-wrap: wrap;
          border-radius: 8px;
          align-items: center;

          &_card {
            gap: 16px;
            padding: 8px;
            display: flex;
            align-items: center;
            text-decoration: none;
            background: ${customColors.paleGrey};

            &_img {
              width: 40px;
              height: 40px;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }

            &_content {
              h6 {
                color: #2b1d40;
                font-size: 14px;
                font-weight: 600;
                line-height: 24px;
                font-style: normal;
                font-family: Plus Jakarta Sans;
              }

              p {
                color: #6b6b6b;
                font-size: 12px;
                font-weight: 400;
                font-style: normal;
                line-height: normal;
                font-family: Plus Jakarta Sans;
              }
            }
          }
        }

        .instructor,
        .topics {
          > div {
            gap: 8px;
            display: flex;
            flex-wrap: wrap;
            padding-top: 6px;
            align-items: center;

            span {
              font-size: 16px;
              font-weight: 500;
              padding: 4px 12px;
              font-style: normal;
              border-radius: 4px;
              line-height: normal;
              color: ${secondary.main};
              text-transform: capitalize;
              font-family: Plus Jakarta Sans;
              background: ${secondary.contrast};
              border: 1px solid ${secondary.main};
            }
          }
        }
      }
    }

    &_installment {
      padding: 20px 0 0;

      > div {
        gap: 5px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    &_outcomes {
      padding: 20px 0;
      ul {
        margin: 0;
        padding-left: 30px;
        color: ${customColors.lightGrey};

        li {
          font-size: 16px;
          padding-top: 8px;
          font-weight: 400;
          line-height: 26px;
          font-style: normal;
          font-family: Plus Jakarta Sans;
        }
      }
    }

    &_weekDays {
      padding: 20px 0;
    }

    &_btn-container {
      gap: 16px;
      display: flex;
      padding-top: 32px;
      align-items: center;
      justify-content: flex-end;

      > button {
        width: 150px;
      }
    }
  }
`;

export const StyledCourseDetailsHeader = styled.div`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 520px) {
    margin-bottom: 15px;
  }

  .left {
    flex: 1;
    gap: 12px;
    display: flex;
    align-items: center;

    > button {
      padding: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid ${primary.main};

      > svg {
        color: ${primary.main};
      }
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      font-style: normal;
      white-space: nowrap;
      line-height: normal;
      color: ${primary.main};
    }
  }

  .right {
    gap: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    >button {
      white-space: nowrap;
    }
  }
`;

export const StyledTimeSlotButton = styled(Button)(
  ({ active, additionalStyles }) => ({
    fontStyle: 'normal',
    border: 'none !important',
    fontSize: '14px !important',
    fontWeight: '400 !important',
    lineHeight: 'normal !important',
    fontFamily: 'Plus Jakarta Sans !important',
    borderRadius: active ? '4px !important' : 'none !important',
    background: `${active ? secondary.main : 'transparent'} !important`,
    color: `${active ? customColors.white : customColors.lightGrey} !important`,

    '&:hover': {
      borderRadius: '4px !important',
      color: `${customColors.white} !important`,
      background: `${secondary.main} !important`
    },

    ...additionalStyles
  })
);

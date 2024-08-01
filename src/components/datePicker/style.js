import styled from 'styled-components';
import { primary, secondary, customColors } from 'theme/pallete';

export const StyledDatePicker = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;

  .react-datepicker-wrapper {
    padding: 11px;
    border-radius: 8px;
    border: 1px solid ${customColors.grey};
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

    .react-datepicker__input-container {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;

      svg {
        padding: 0;
      }

      input {
        padding: 0;
        width: 100%;
        border: none;
        outline: none;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        font-style: normal;
        color: ${customColors.black};
        font-family: Plus Jakarta Sans;

        @media screen and (max-width: 520px) {
          font-size: 14px;
        }
      }
    }
  }

  .react-datepicker-popper {
    width: 100%;
    max-width: 430px;

    @media screen and (max-width: 600px) {
      max-width: 350px;
    }

    @media screen and (max-width: 450px) {
      max-width: 300px;
    }

    @media screen and (max-width: 400px) {
      max-width: 250px;
    }

    @media screen and (max-width: 350px) {
      max-width: 215px;
    }

    .react-datepicker {
      width: 100%;
      border-radius: 16px;
      background: ${customColors.white};
      border: 1px solid ${customColors.grey};

      .react-datepicker__navigation--previous {
        top: 9px;
        left: 120px;
        width: 24px;
        height: 24px;

        @media screen and (max-width: 600px) {
          left: 80px;
        }

        @media screen and (max-width: 450px) {
          left: 50px;
        }

        @media screen and (max-width: 350px) {
          left: 30px;
        }

        .react-datepicker__navigation-icon--previous::before {
          width: 7px;
          height: 7px;
          border-color: ${primary.main};
        }
      }

      .react-datepicker__navigation--next {
        top: 9px;
        width: 24px;
        height: 24px;
        right: 120px;

        @media screen and (max-width: 600px) {
          right: 80px;
        }

        @media screen and (max-width: 450px) {
          right: 50px;
        }

        @media screen and (max-width: 350px) {
          right: 30px;
        }

        .react-datepicker__navigation-icon--next::before {
          width: 7px;
          height: 7px;
          border-color: ${primary.main};
        }
      }

      .react-datepicker__month-container {
        float: unset;

        .react-datepicker__header {
          padding: 8px 0;
          border-radius: none;
          background: transparent;

          .react-datepicker__current-month {
            font-size: 18px;
            font-weight: 600;
            font-style: normal;
            line-height: normal;
            color: ${primary.main};
            font-family: Plus Jakarta Sans;

            @media screen and (max-width: 520px) {
              font-size: 16px;
            }
          }

          .react-datepicker__day-names {
            display: flex;
            padding: 0 10px;
            margin-top: 12px;
            justify-content: space-between;

            .react-datepicker__day-name {
              font-size: 16px;
              font-weight: 400;
              line-height: 24px;
              font-style: normal;
              letter-spacing: 0.5px;
              color: ${customColors.black};
              font-family: Plus Jakarta Sans;

              @media screen and (max-width: 520px) {
                font-size: 14px;
              }
            }
          }
        }

        .react-datepicker__month {
          .react-datepicker__week {
            display: flex;
            padding: 0 10px;
            justify-content: space-between;
            .react-datepicker__day {
              font-size: 16px;
              font-weight: 400;
              line-height: 24px;
              font-style: normal;
              letter-spacing: 0.5px;
              color: ${customColors.black};
              font-family: Plus Jakarta Sans;

              @media screen and (max-width: 520px) {
                font-size: 14px;
              }
            }

            .react-datepicker__day--disabled {
              color: ${customColors.grey};
            }

            .react-datepicker__day--today {
              background-color: transparent !important;
            }

            .react-datepicker__day--selected {
              border-radius: 50%;
              color: ${customColors.white};
              background: ${secondary.main} !important;
            }
          }
        }
      }
    }
  }
`;

import styled from 'styled-components';
import { primary, secondary, customColors } from 'theme/pallete';

export const StyledCreateNewCourse = styled.div`
  gap: 60px;
  display: flex;
  padding: 40px;
  overflow: hidden;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    gap: 30px;
    flex-direction: row;
  }

  @media screen and (max-width: 520px) {
    gap: 10px;
    padding: 30px;
  }

  form {
    gap: 24px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 520px) {
      gap: 12px;
    }

    .field-control {
      position: relative;
    }

    .btn-container {
      gap: 16px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      @media screen and (max-width: 400px) {
        flex-wrap: wrap;
        justify-content: center;
      }

      button {
        width: 140px;
      }
    }
  }
`;

export const StyledCourseContent = styled.div`
  .box_container {
    margin-top: 24px;
    border-radius: 8px;
    border: 1px solid ${customColors.grey};

    &_title {
      padding: 20px;
      font-size: 20px;
      font-weight: 700;
      font-style: normal;
      line-height: normal;
      color: ${primary.main};
      font-family: Plus Jakarta Sans;

      @media screen and (max-width: 520px) {
        padding: 10px;
      }
    }

    &_form {
      gap: 24px;
      display: flex;
      padding: 20px 24px;
      flex-direction: column;
      @media screen and (max-width: 520px) {
        padding: 10px 12px;
      }

      &_days > h3 {
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        line-height: normal;
        padding-bottom: 12px;
        color: ${customColors.black};
        font-family: Plus Jakarta Sans;
      }

      &_timePicker {
        gap: 24px;
        display: flex;
        @media screen and (max-width: 768px) {
          flex-wrap: wrap;
        }

        > div {
          width: 100%;

          .sm {
            font-size: 14px;
            font-weight: 400;
            font-style: normal;
            line-height: normal;
            font-family: Plus Jakarta Sans;
            color: #3a3a3a;
          }

          .MuiStack-root {
            width: 100%;
          }
        }
      }
    }
  }
`;

export const StyledCoursePayment = styled.div`
  .payment_card {
    width: 100%;
    padding: 24px;
    max-width: 315px;
    border-radius: 8px;
    margin-bottom: 32px;
    background: ${customColors.white};
    border: 1px solid ${customColors.grey};
    backdrop-filter: blur(5.257328033447266px);
    box-shadow: 0px 0px 5px 0px rgba(51, 48, 48, 0.15);

    @media screen and (max-width: 520px) {
      padding: 12px;
      max-width: 250px;
      margin-bottom: 16px;
    }

    @media screen and (max-width: 400px) {
      max-width: 190px;
    }

    &_icon {
      width: 40px;
      height: 40px;
      display: flex;
      border-radius: 8px;
      align-items: center;
      justify-content: center;
      background: ${secondary.contrast};
    }

    h3 {
      font-size: 16px;
      font-weight: 600;
      margin-top: 12px;
      margin-bottom: 8px;
      font-style: normal;
      line-height: normal;
      color: ${customColors.black};
    }

    p {
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      line-height: normal;
      color: ${customColors.lightGrey};
    }
  }

  .installment {
    > button {
      width: auto;
    }

    > p {
      margin: 32px 0;
      font-size: 16px;
      font-weight: 500;
      font-style: normal;
      line-height: normal;
      color: ${customColors.black};
    }

    &_plans {
      gap: 20px;
      display: flex;
      flex-direction: column;

      .active {
        background: #f8f8f8;
        .installment-content {
          overflow: auto;
          max-height: 200px;
          padding-top: 20px;
          padding-right: 5px;

          &::-webkit-scrollbar {
            width: 3px;
            height: 3px;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: ${customColors.grey};
          }

          @media screen and (max-width: 520px) {
            padding-top: 20px;
          }
        }
      }

      &_plan {
        width: 100%;
        padding: 6px;
        max-width: 355px;
        border-radius: 4px;
        border: 1px solid #2c90c5;
        background: ${customColors.white};

        .installment-content {
          width: 100%;
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          transition-property: max-height, padding-top;

          p {
            display: flex;
            font-size: 14px;
            font-weight: 500;
            font-style: normal;
            align-items: center;
            line-height: normal;
            padding-bottom: 12px;
            color: ${customColors.black};
            justify-content: space-between;

            span {
              color: #ee5454;
              font-size: 14px;
              font-weight: 500;
              font-style: italic;
              line-height: normal;
            }
          }
        }
      }
    }
  }

  .payment_gateways {
    h3 {
      font-size: 16px;
      font-weight: 500;
      font-style: normal;
      line-height: normal;
      color: ${customColors.black};
    }

    &_cards {
      gap: 12px;
      display: flex;
      flex-wrap: wrap;
      padding-top: 8px;
      align-items: center;

      &_card {
        width: 98px;
        height: 60px;
        display: flex;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        background: ${customColors.white};
        border: 1px solid ${customColors.grey};
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

export const StyledSelectionList = styled.div`
  gap: 16px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  align-items: center;

  @media screen and (max-width: 768px) {
    gap: 8px;
  }

  .box {
    gap: 4px;
    display: flex;
    padding: 8px 12px;
    border-radius: 8px;
    background: ${secondary.main};

    @media screen and (max-width: 768px) {
      padding: 6px;
    }

    &_text {
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      line-height: normal;
      word-break: break-all;
      text-transform: capitalize;
      color: ${customColors.white};
      font-family: Plus Jakarta Sans;

      @media screen and (max-width: 768px) {
        font-size: 12px;
      }
    }

    .remove-btn {
      padding: 0;
      background: transparent;
      & > svg {
        font-size: 20px;
        color: ${customColors.white};
        @media screen and (max-width: 768px) {
          font-size: 16px;
        }
      }
    }
  }
`;

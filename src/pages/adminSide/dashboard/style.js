import { Button } from '@mui/material';
import styled from 'styled-components';
import { secondary, customColors, primary } from 'theme/pallete';

export const StyledDashboardContent = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;

  .table-container {
    padding: 24px 0;
    border-radius: 12px;
    background: ${customColors.white};
    box-shadow: 0px 3px 10px 0px rgba(51, 48, 48, 0.15);

    @media screen and (max-width: 520px) {
      padding: 12px;
    }

    div:nth-child(3) {
      display: none;
    }

    .header {
      display: flex;
      padding: 0 24px;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 24px;
      justify-content: space-between;

      @media screen and (max-width: 520px) {
        gap: 10px;
        padding: 0;
        margin-bottom: 12px;
      }

      button {
        width: auto;
        border-radius: 4px;
        border: 1px solid #d0d5dd;
        box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
      }
    }
  }
`;

export const StyledCards = styled.div`
  gap: 24px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 520px) {
    gap: 12px;
    grid-template-columns: 1fr;
  }

  .card {
    height: 85px;
    cursor: pointer;
    border-radius: 8px;
    padding: 24px 24px 0;
    box-shadow: 0px 0px 2px 0px rgba(215, 215, 215, 0.25);
    background: linear-gradient(99deg, #012168 -1.25%, #017abb 96.97%);

    @media screen and (max-width: 520px) {
      padding: 12px 12px 0;
    }

    &_detail {
      gap: 8px;
      display: flex;
      flex-direction: column;

      p {
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        line-height: normal;
        color: ${customColors.white};
      }

      h3 {
        font-size: 24px;
        font-weight: 600;
        line-height: 36px;
        font-style: normal;
        color: ${customColors.white};
      }
    }
  }
`;

export const StyledGraph = styled.div`
  width: 100%;
  border-radius: 12px;
  background: ${customColors.white};
  border: 1px solid ${customColors.paleGrey};
  box-shadow: 0px 0px 2px 0px rgba(215, 215, 215, 0.25);

  .header {
    padding: 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 520px) {
      gap: 10px;
      padding: 12px;
    }
  }
`;

export const StyledCalendar = styled.div`
  width: 100%;
  border-radius: 12px;
  background: ${customColors.white};
  border: 1px solid ${customColors.paleGrey};
  box-shadow: 0px 0px 2px 0px rgba(215, 215, 215, 0.25);

  .header {
    display: flex;
    padding: 24px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 520px) {
      gap: 10px;
      padding: 12px;
    }
  }

  .calendar {
    padding: 24px;

    @media screen and (max-width: 520px) {
      padding: 12px;
    }

    & .fc-event {
      border: none;
      background-color: transparent;
      & .fc-content,
      & .fc-time {
        color: white;
      }
    }

    & .fc-day-today {
      background: ${customColors.white} !important;
    }

    & .fc-daygrid-body {
      display: none !important;
    }

    & table.fc-scrollgrid.fc-scrollgrid-liquid {
      border: none;
    }

    & thead {
      display: none;
    }

    & tbody {
      & tr:first-of-type {
        & td {
          border: none;
        }
      }
      & tr:nth-of-type(2) {
        display: none;
      }
      & tr:nth-of-type(3) {
        & tbody {
          & tr:first-of-type {
            & td:nth-of-type(2) {
              border: none;
              border-top: 1px solid ${customColors.grey} !important;
            }
          }
        }

        & td:first-of-type {
          border: none;
        }

        & td:nth-of-type(2) {
          border: none;
          border-top: 1px solid ${customColors.grey};
        }
      }
    }

    .fc .fc-timegrid-slot-minor {
      border: none !important;
      border-right: 1px solid ${customColors.grey} !important;
    }

    & .fc-timegrid-slot-label-cushion.fc-scrollgrid-shrink-cushion {
      font-size: 12px;
      color: ${primary.main};
      text-transform: uppercase;
    }

    & colgroup {
      border-right: 1px solid ${customColors.grey};
    }

    & .fc-timegrid-event-harness.fc-timegrid-event-harness-inset {
      width: fit-content;
    }

    & .fc-scroller.fc-scroller-liquid-absolute {
      overflow: auto !important;

      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${customColors.grey};
      }
    }

    & .fc-timegrid-body {
      min-width: 900px !important;
      & .fc-timegrid-slots,
      .fc-timegrid-cols {
        & table {
          min-width: 900px !important;
        }
      }
    }
  }
`;

export const StyledHeading = styled.h3`
  font-size: 20px;
  font-weight: 700;
  font-style: normal;
  line-height: normal;
  color: ${primary.main};

  @media screen and (max-width: 520px) {
    font-size: 18px;
  }
`;

export const StyledEventContent = styled.div`
  width: 260px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
  word-break: break-word;
  background: ${secondary.contrast};
  border-left: 4px solid ${secondary.main};

  .course {
    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    > div {
      display: flex;
      justify-content: space-between;

      .name {
        width: 135px;
        font-size: 14px;
        font-weight: 600;
        font-style: normal;
        line-height: normal;
        color: ${secondary.main};
      }

      .batch {
        font-size: 12px;
        padding-top: 4px;
        font-weight: 400;
        font-style: normal;
        line-height: normal;
        color: ${customColors.lightGrey};
      }

      .same-prop {
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        line-height: normal;
        color: ${customColors.black};
      }
    }
  }
`;

export const StyledTimeSlotButton = styled(Button)(({ active }) => ({
  width: '100%',
  height: '42px',
  fontStyle: 'normal',
  padding: '0 !important',
  border: 'none !important',
  fontSize: '12px !important',
  fontWeight: '400 !important',
  lineHeight: 'normal !important',
  textTransform: 'capitalize !important',
  fontFamily: 'Plus Jakarta Sans !important',
  borderRadius: active ? '4px !important' : 'none !important',
  background: `${active ? secondary.main : 'transparent'} !important`,
  color: `${active ? customColors.white : customColors.lightGrey} !important`,

  '&:hover': {
    borderRadius: '4px !important',
    color: `${customColors.white} !important`,
    background: `${secondary.main} !important`
  },

  '@media screen and (max-width: 630px)': {
    width: 'auto'
  }
}));

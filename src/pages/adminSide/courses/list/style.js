import styled from 'styled-components';
import { secondary, customColors } from 'theme/pallete';

export const StyledCoursesList = styled.div`
  padding: 24px 20px;
  border-top: 1px solid ${customColors.grey};
  border-bottom: 1px solid ${customColors.grey};

  @media screen and (max-width: 520px) {
    padding: 12px 10px;
  }

  > div {
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .MuiPaper-root {
      border-radius: 8px;
      background: ${customColors.white};
      border: 1px solid ${customColors.paleGrey};
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
    }

    .MuiCardContent-root {
      border-bottom: 1px solid ${secondary.contrast};
      .title {
        display: flex;
        justify-content: space-between;

        h2 {
          font-size: 20px;
          font-weight: 600;
          font-style: normal;
          line-height: normal;
          color: ${customColors.black};
        }
      }

      .details {
        padding-top: 12px;
        > span {
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          padding-right: 8px;
          line-height: normal;
          font-family: Plus Jakarta Sans;
          color: ${customColors.lightGrey};
        }

        .completed {
          .MuiLinearProgress-bar {
            background: ${customColors.success};
          }

          p {
            color: ${customColors.success};
          }
        }

        .in-progress {
          .MuiLinearProgress-bar {
            background: ${secondary.lighter};
          }

          p {
            color: ${customColors.black};
          }
        }

        &_progressbar {
          padding-top: 24px;

          .MuiLinearProgress-root {
            height: 8px;
            border-radius: 4px;
            background: ${customColors.paleGrey};
          }

          &_value {
            padding-top: 4px;
            font-size: 12px;
            font-weight: 400;
            font-style: italic;
            line-height: normal;
          }
        }
      }
    }

    .MuiCardActions-root {
      padding: 12px;
    }
  }
`;

export const StyledNoCoursesContent = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  padding-bottom: 10px;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 475px) {
    min-height: fit-content;
    img {
      width: 350px;
      height: 240px;
    }
  }

  @media screen and (max-width: 375px) {
    img {
      width: 280px;
      height: 200px;
    }
  }

  > div {
    gap: 24px;
    display: flex;
    margin-top: 16px;
    align-items: center;
    flex-direction: column;

    button {
      width: auto;
    }

    p {
      font-size: 20px;
      font-weight: 400;
      font-style: normal;
      line-height: normal;
      color: ${customColors.lightGrey};
    }
  }
`;

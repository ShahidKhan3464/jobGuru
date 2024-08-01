import styled, { css } from 'styled-components';
import { primary, secondary } from 'theme/pallete';

export const StyledStepper = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: space-between;
  }

  .step {
    gap: 12px;
    width: 25%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    &:first-child {
      width: 13%;
      justify-content: flex-start;
      span {
        left: -35px;
      }

      @media screen and (max-width: 768px) {
        width: 25%;
        justify-content: center;

        span {
          left: auto;
        }
      }
    }
    &:last-child {
      width: 13%;
      justify-content: flex-end;
      span {
        right: -35px;
      }

      @media screen and (max-width: 768px) {
        width: 25%;
        justify-content: center;

        span {
          right: auto;
        }

        &::after {
          width: 0;
        }
      }
    }

    &::after {
      left: 0;
      right: 0;
      top: 15px;
      content: '';
      height: 2px;
      position: absolute;
      background: #eaecf0;

      @media screen and (max-width: 768px) {
        top: 130px;
        left: unset;
        right: unset;
        width: 150px;
        transform: rotate(90deg);
      }
    }

    > div {
      z-index: 1;
      width: 24px;
      height: 24px;
      border-radius: 50px;

      @media screen and (max-width: 768px) {
        width: 20px;
        height: 20px;

        img {
          width: 20px;
          height: 20px;
        }
      }
    }

    &_label {
      bottom: -30px;
      font-size: 12px;
      font-weight: 600;
      font-style: normal;
      text-align: center;
      position: absolute;
      line-height: normal;
      color: ${primary.main};
      font-family: Plus Jakarta Sans;

      @media screen and (max-width: 520px) {
        font-size: 10px;
      }
    }
  }

  ${({ step }) => {
    return css`
      .step:nth-child(${step}) {
        > div {
          border: 4px solid ${secondary.lightest};
        }
      }

      .step:nth-child(${step + 1}) {
        > div {
          border: none;
        }
      }
    `;
  }}
`;

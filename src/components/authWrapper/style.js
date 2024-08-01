import styled from 'styled-components';
import { primary, customColors } from 'theme/pallete';

export const StyledAuthWrapper = styled.div`
  display: flex;
  padding-top: 5px;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 5px);

  .content {
    width: 100%;
    display: flex;
    max-width: 555px;
    padding: 30px 50px;
    border-radius: 40px;
    flex-direction: column;
    justify-content: center;
    border: 2px solid ${customColors.paleGrey};
    box-shadow: 0px 0px 2px 0px rgba(215, 215, 215, 0.25);
    background: linear-gradient(
      99deg,
      rgba(1, 33, 104, 0.08) -1.25%,
      rgba(1, 122, 187, 0.08) 96.97%
    );

    @media screen and (max-width: 670px) {
      max-width: 400px;
      padding: 20px 30px;
    }

    @media screen and (max-width: 475px) {
      padding: 15px;
      max-width: 350px;
    }

    @media screen and (max-width: 375px) {
      padding: 10px;
      max-width: 270px;
    }

    &_top {
      gap: 16px;
      display: flex;
      margin-bottom: 24px;
      align-items: center;
      flex-direction: column;

      h3 {
        font-size: 38px;
        font-weight: 700;
        font-style: normal;
        line-height: normal;
        color: ${primary.main};
        text-transform: capitalize;

        @media screen and (max-width: 375px) {
          font-size: 30px;
        }
      }

      p {
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        line-height: normal;
        color: ${primary.main};
      }
    }

    &_form {
      form {
        .field-control {
          position: relative;

          .MuiInputBase-root {
            padding: 0;
          }
        }

        > button {
          width: 100% !important;
        }
      }
    }
  }
`;

import { Images } from 'assets';
import styled from 'styled-components';
import { FormLabel } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { customColors, primary } from 'theme/pallete';

export const FieldErrorMessage = styled.p`
  color: #f26464;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  line-height: normal;
  font-family: Plus Jakarta Sans;

  @media screen and (max-width: 520px) {
    font-size: 12px;
  }
`;

export const StyledStatus = styled.span`
  font-size: 12px;
  padding: 5px 8px;
  font-weight: 600;
  font-style: normal;
  border-radius: 50px;
  line-height: normal;
  font-family: Plus Jakarta Sans;
  color: ${(props) => props.color};
  background: ${(props) => props.bg};
`;

export const StyledSnackbarProvider = styled(SnackbarProvider)`
  .go946087465 {
    align-items: flex-start;
  }
  &.notistack-MuiContent-success {
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    background-color: #e3ffe0;
    border: 1.5px solid #27ae60;
    color: ${customColors.black};
    font-family: Plus Jakarta Sans;
    box-shadow: 0px 0px 5px 0px rgba(51, 48, 48, 0.15);
  }
  &.notistack-MuiContent-success svg {
    color: #27ae60;
  }
  &.notistack-MuiContent-error {
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    background-color: #ffe4e4;
    border: 1.5px solid #d32f2f;
    color: ${customColors.black};
    font-family: Plus Jakarta Sans;
    box-shadow: 0px 0px 5px 0px rgba(51, 48, 48, 0.15);
  }
  &.notistack-MuiContent-error svg {
    color: #d32f2f;
  }
  &.notistack-MuiContent-warning {
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    background-color: #ffe4e4;
    border: 1.5px solid #f37021;
    color: ${customColors.black};
    font-family: Plus Jakarta Sans;
    box-shadow: 0px 0px 5px 0px rgba(51, 48, 48, 0.15);
  }
  &.notistack-MuiContent-warning svg {
    color: #f37021;
  }
`;

export const StyledContentBox = styled.div`
  border-radius: 12px;
  background: ${customColors.white};
  border: 1px solid ${customColors.paleGrey};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
`;

export const StyledTableHeader = styled.div`
  gap: 10px;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 520px) {
    padding: 12px;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    font-style: normal;
    line-height: normal;
    color: ${primary.main};
    font-family: Plus Jakarta Sans;
  }

  .left {
    gap: 16px;
    display: flex;
    align-items: center;

    @media screen and (max-width: 520px) {
      flex-wrap: wrap;
    }
  }
`;

export const StyledTextarea = styled.div`
  .MuiInputBase-root {
    height: 100px;
    align-items: flex-start;
    padding: 0 0  16px !important;

    textarea {
      padding: 12px 12px 0;
      height: 100% !important;
      overflow: auto !important;

      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
      }

      @media screen and (max-width: 520px) {
        padding: 8px 8px 0;
      }
    }
  }
`;

export const StyledPopContent = styled.div`
  gap: 16px;
  height: 260px;
  display: flex;
  text-align: center;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 520px) {
    height: 230px;
  }

  @media screen and (max-width: 400px) {
    gap: 10px;
    padding: 10px;
  }

  > button {
    width: 320px;
    margin-top: 8px;
  }

  .text {
    h3 {
      font-size: 18px;
      font-weight: 600;
      font-style: normal;
      line-height: normal;
      color: ${customColors.black};
      font-family: Plus Jakarta Sans;
    }

    p {
      font-size: 14px;
      padding-top: 8px;
      font-weight: 400;
      line-height: 20px;
      font-style: normal;
      font-family: Plus Jakarta Sans;
      color: ${customColors.lightGrey};
    }
  }

  .btn-container {
    gap: 16px;
    width: 100%;
    display: flex;
    padding-top: 8px;
    align-items: center;
    justify-content: center;

    button {
      width: 152px;
    }
  }

  .resend-verification {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
    font-family: Plus Jakarta Sans;
    color: ${customColors.darkGrey};
  }
`;

export const StyledLoadingContainer = styled.div`
  display: flex;
  min-height: 500px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 520px) {
    min-height: 250px;
  }

  span {
    color: ${customColors.black};
  }
`;

export const StyledDetailContent = styled.div`
  .bg-img {
    width: 100%;
    height: 220px;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${Images.bgProfile});

    @media screen and (max-width: 520px) {
      height: 200px;
    }
  }

  .profile {
    &_content {
      gap: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      > button {
        width: auto;
        img {
          width: 20px;
          height: 20px;

          @media screen and (max-width: 520px) {
            width: 16px;
            height: 16px;
          }
        }
      }

      &_dp {
        margin-left: 24px;
        margin-top: -77px;

        @media screen and (max-width: 520px) {
          margin-left: 12px;
        }

        &_img {
          width: 177px;
          height: 177px;

          @media screen and (max-width: 520px) {
            width: 120px;
            height: 120px;
          }
        }

        &_upload {
          z-index: 1;
          cursor: pointer;
          margin-left: -40px;
        }

        &_name {
          font-size: 22px;
          font-weight: 600;
          margin-top: 24px;
          font-style: normal;
          line-height: normal;
          color: ${customColors.black};

          @media screen and (max-width: 520px) {
            font-size: 18px;
            margin-top: 6px;
          }
        }

        &_role {
          color: #424242;
          font-size: 16px;
          font-weight: 400;
          font-style: normal;
          line-height: normal;
          font-family: Plus Jakarta Sans;

          @media screen and (max-width: 520px) {
            font-size: 14px;
          }
        }
      }
    }

    &_data {
      padding: 24px;
      margin-top: 24px;
      border-radius: 8px;
      background: ${customColors.white};
      border: 1px solid ${customColors.grey};
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

      @media screen and (max-width: 520px) {
        padding: 12px;
        margin-top: 12px;
      }

      .title {
        font-size: 22px;
        font-weight: 600;
        font-style: normal;
        line-height: normal;
        padding-bottom: 24px;
        color: ${customColors.black};
      }

      .key {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        font-style: normal;
        color: ${customColors.black};
      }

      .value {
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        font-style: normal;
        color: ${customColors.lightGrey};
      }
    }
  }
`;

export const StyledFormLabel = styled(FormLabel)(() => ({
  fontStyle: 'normal',
  fontSize: '16px !important',
  fontWeight: '500 !important',
  lineHeight: 'normal !important',
  color: `${primary.main} !important`,
  fontFamily: 'Plus Jakarta Sans !important',

  '@media screen and (max-width: 520px)': {
    fontSize: '14px !important'
  }
}));

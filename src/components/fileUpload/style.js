import styled from 'styled-components';
import { primary, customColors } from 'theme/pallete';

export const StyledFileUpload = styled.div`
  gap: 6px;
  display: flex;
  flex-direction: column;

  .fileUpload {
    padding: 7px;
    height: 103px;
    overflow: auto;
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    background: ${customColors.white};
    border: 1px solid ${props => props.error ? '#D02626' : `${customColors.grey}`};,

    &::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }

    .loading {
      height: 103px;
      display: flex;
      font-size: 24px;
      font-weight: 600;
      font-style: normal;
      line-height: normal;
      align-items: center;
      color: ${primary.main};
      justify-content: center;
    }
  }

  .file_uploaded {
    gap: 16px;
    display: flex;
    flex-wrap: wrap;

    &_thumbnail {
      width: 100%;
      height: 184px;

      @media screen and (max-width: 768px) {
        height: 141px;
      }

      @media screen and (max-width: 520px) {
        height: 70px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
      }

      span {
        top: 15px;
        right: 15px;
        padding: 5px;
        display: flex;
        position: absolute;
        border-radius: 50%;
        transition: all 0.3s ease;
        transition-property: opacity;
        background: ${customColors.lightGrey};
        pointer-events: ${(props) => props.disabled && 'none'};
        cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

        svg {
          width: 16px;
          fill: white;
          height: 16px;
        }
      }
    }

    &_card {
      gap: 16px;
      padding: 8px;
      display: flex;
      border-radius: 8px;
      align-items: center;
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

      > button {
        pointer-events: ${(props) => props.disabled && 'none'};
        cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
        svg {
          width: 20px;
          height: 20px;
          color: ${primary.main};
        }
      }
    }
  }
`;

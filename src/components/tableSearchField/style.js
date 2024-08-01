import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledTableSearchField = styled.div`
  width: 100%;
  max-width: 220px;

  @media screen and (max-width: 520px) {
    max-width: inherit;
  }

  .field {
    gap: 8px;
    height: 34px;
    display: flex;
    border-radius: 8px;
    padding-left: 16px;
    align-items: center;
    border: 1px solid ${customColors.grey};

    input {
      padding: 0;
      height: 100%;
      border: none;
      outline: none;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      font-style: normal;
      background: transparent;
      color: ${customColors.black};
      font-family: 'Plus Jakarta Sans';

      @media screen and (max-width: 520px) {
        font-size: 14px;
      }

      &::placeholder {
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        font-style: normal;
        color: ${customColors.grey};
        font-family: Plus Jakarta Sans;
      }
    }
  }
`;

import { Icons } from 'assets';
import styled from 'styled-components';
import { primary, secondary, customColors } from 'theme/pallete';

export const StyledPaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 24px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ede9ec;

  @media screen and (max-width: 520px) {
    gap: 10px;
    padding: 10px 12px;
    justify-content: center;
  }

  .left {
    gap: 8px;
    display: flex;
    align-items: center;

    span {
      color: #000;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      font-style: normal;
      font-family: Plus Jakarta Sans;
    }

    select {
      width: 70px;
      outline: none;
      cursor: pointer;
      font-size: 14px;
      appearance: none;
      font-weight: 600;
      padding: 5px 12px;
      line-height: 20px;
      font-style: normal;
      border-radius: 4px;
      background-repeat: no-repeat;
      font-family: Plus Jakarta Sans;
      background-position: 65% center;
      color: ${customColors.lightGrey};
      background-color: ${customColors.white};
      border: 1px solid ${customColors.paleGrey};
      background-image: url(${Icons.selectArrow});
    }
  }

  .MuiPagination-root {
    li {
      button {
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        border-radius: 8px;
        line-height: normal;
        color: ${primary.main};
        font-family: Plus Jakarta Sans;
        background: ${customColors.white};
        border: 1px solid ${customColors.grey};
      }

      .Mui-selected {
        border: none;
        color: ${customColors.white};
        background: ${secondary.main};
      }

      .MuiPaginationItem-ellipsis {
        font-weight: 600;
        color: ${primary.main};
      }
    }
  }
`;

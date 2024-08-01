import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledPhoneField = styled.div`
  width: 100%;
  position: relative;

  .react-tel-input input {
    width: 100%;
    height: 48px;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    padding: 14px 60px;
    border-radius: 8px;
    color: ${customColors.black};
    background: ${customColors.white};
    border: 1px solid
      ${(props) => (props.error ? '#D02626' : customColors.grey)};

    @media screen and (max-width: 520px) {
      height: 38px;
      font-size: 14px;
    }

    &::placeholder {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      font-style: normal;
      font-family: Plus Jakarta Sans;
      color: ${customColors.lightGrey};

      @media screen and (max-width: 520px) {
        font-size: 14px;
      }
    }
  }

  .flag-dropdown {
    border-radius: 8px 0 0 8px;
    background: ${customColors.white};
    border: 1px solid
      ${(props) => (props.error ? '#D02626' : customColors.grey)};

    .selected-flag {
      width: 50px;
      border-radius: 8px 0 0 8px;
    }
  }
`;

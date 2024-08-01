import styled from 'styled-components';
import { primary, customColors } from 'theme/pallete';

export const StyledNoInstructorContent = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  padding-bottom: 20px;
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

export const StyledAddInstructor = styled.div`
  padding: 40px;

  @media screen and (max-width: 520px) {
    padding: 20px;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    justify-content: space-between;

    @media screen and (max-width: 375px) {
      margin-bottom: 20px;
    }

    h3 {
      font-size: 26px;
      font-weight: 600;
      font-style: normal;
      line-height: normal;
      color: ${primary.main};

      @media screen and (max-width: 375px) {
        font-size: 20px;
      }
    }
  }

  form {
    gap: 24px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 375px) {
      gap: 12px;
    }

    .btn-container {
      gap: 16px;
      display: flex;
      padding-top: 8px;
      align-items: center;
      justify-content: flex-end;

      button {
        width: 140px;
      }
    }
  }
`;

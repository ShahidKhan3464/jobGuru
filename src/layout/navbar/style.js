import styled from 'styled-components';
import { customColors, primary } from 'theme/pallete';

export const StyledLgNavbar = styled.div`
  top: 0;
  right: 0;
  z-index: 2;
  height: 70px;
  display: flex;
  position: fixed;
  padding: 0 24px;
  align-items: center;
  width: calc(100% - 370px);
  justify-content: space-between;
  background: ${customColors.white};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 1023px) {
    left: 0;
    width: auto;
  }

  @media screen and (max-width: 520px) {
    height: 60px;
    padding: 0 12px;
  }

  .right {
    &_title {
      @media screen and (max-width: 1023px) {
        display: none;
      }
      h2 {
        font-size: 24px;
        font-weight: 600;
        margin-left: 5px;
        font-style: normal;
        line-height: normal;
        color: ${primary.main};
        text-transform: capitalize;
      }
    }

    &_hamburger-menu {
      @media screen and (min-width: 1023px) {
        display: none;
      }
    }
  }

  .logo {
    img {
      width: 40px;
      height: 40px;
    }
  }

  .left {
    gap: 20px;
    display: flex;
    align-items: center;

    @media screen and (max-width: 520px) {
      gap: 10px;
    }

    > button {
      width: auto !important;
    }

    .profile {
      gap: 12px;
      display: flex;
      align-items: center;

      @media screen and (max-width: 520px) {
        gap: 6px;
      }

      .detail {
        gap: 10px;
        display: flex;
        cursor: pointer;
        position: relative;
        align-items: center;

        @media screen and (max-width: 520px) {
          gap: 5px;

          > img {
            width: 18px;
            height: 18px;
          }
        }

        p {
          font-style: normal;
          line-height: normal;
          text-transform: capitalize;
        }

        .name {
          font-size: 16px;
          font-weight: 600;
          color: ${customColors.darkGrey};

          @media screen and (max-width: 520px) {
            font-size: 14px;
          }
        }

        .role {
          font-size: 12px;
          font-weight: 400;
          color: ${customColors.lightGrey};

          @media screen and (max-width: 520px) {
            font-size: 10px;
            white-space: nowrap;
          }
        }

        &_content {
          right: 0;
          top: 40px;
          position: absolute;
          border-radius: 8px;
          padding: 15px 15px 0;
          border: 1px solid #eaecf0;
          color: ${customColors.black};
          background: ${customColors.white};
          box-shadow: 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08);

          @media screen and (max-width: 520px) {
            padding: 0 10px;
          }
        }
      }
    }
  }
`;

export const StyledNotifications = styled.div`
  right: 0;
  width: 100%;
  height: 400px;
  min-width: 350px;
  overflow-y: auto;
  position: absolute;
  border-radius: 8px;
  padding: 24px 24px 0;
  border: 1px solid #eaecf0;
  color: ${customColors.black};
  background: ${customColors.white};
  box-shadow: 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08);

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${customColors.grey};
  }

  @media screen and (max-width: 520px) {
    top: 30px;
    right: -100px;
    height: 250px;
    min-width: 250px;
    padding: 12px 12px 0;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 24px;
      font-weight: 600;
      font-style: normal;
      line-height: normal;
      color: ${customColors.black};
    }

    p {
      font-size: 12px;
      cursor: pointer;
      font-weight: 500;
      line-height: 21px;
      font-style: normal;
      text-decoration-line: underline;
      color: ${customColors.lightGrey};
    }
  }

  .loader {
    min-height: 350px;

    @media screen and (max-width: 520px) {
      min-height: 200px;
    }
  }

  .no-notifications {
    gap: 24px;
    display: flex;
    min-height: 320px;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 520px) {
      min-height: 200px;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }

  .list {
    padding-top: 24px;
    padding-bottom: 16px;

    @media screen and (max-width: 520px) {
      padding: 12px 0;
    }

    li {
      gap: 10px;
      display: grid;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 8px;
      grid-template-columns: auto auto auto;

      @media screen and (max-width: 520px) {
        padding: 8px;
      }

      .text {
        h3 {
          font-size: 12px;
          font-weight: 600;
          line-height: 20px;
          font-style: normal;
          color: ${customColors.black};
        }

        p {
          color: #6b7280;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          font-style: normal;
        }
      }

      .date {
        font-size: 10px;
        font-weight: 500;
        font-style: italic;
        line-height: normal;
        white-space: nowrap;
        font-family: Plus Jakarta Sans;
        color: ${customColors.darkGrey};
      }
    }
  }
`;

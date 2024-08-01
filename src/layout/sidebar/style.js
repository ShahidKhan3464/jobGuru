import styled from 'styled-components';
import { customColors, secondary } from 'theme/pallete';

export const StyledSidebarContainer = styled.aside`
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 272px;
  padding: 24px;
  overflow: auto;
  position: fixed;
  min-height: 100vh;
  background: ${customColors.white};
  backdrop-filter: blur(5.257328033447266px);
  border-right: 1px solid ${customColors.grey};
  box-shadow: 0px 0px 5px 0px rgba(51, 48, 48, 0.15);
  transition: left 0.3s ease, right 0.3s ease, bottom 0.3s ease, top 0.3s ease !important;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  @media screen and (max-width: 1023px) {
    left: ${(props) => (props.isSidebarVisible ? '0' : '-321px')};
  }

  @media screen and (max-width: 520px) {
    width: 230px;
    padding: 12px;
  }

  .sidebarContainer_logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebarContainer_menu {
    margin-top: 40px;

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;

      li {
        margin-bottom: 10px;

        .active,
        .hover {
          border-radius: 12px;
          background: ${secondary.main};

          .menu-text {
            color: ${customColors.white};
          }
        }

        a {
          gap: 8px;
          display: flex;
          padding: 0 20px;
          border-radius: 6px;
          align-items: center;
          text-decoration: none;

          .menu-text {
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            font-style: normal;
            color: ${customColors.lightGrey};
            text-shadow: 0px 0px 16px ${customColors.white};
          }
        }
      }
    }
  }
`;

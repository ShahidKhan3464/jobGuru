import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;

  .sidebar {
    width: 321px;
    @media screen and (max-width: 1023px) {
      width: auto;
    }
  }

  .layout {
    min-height: 100vh;
    width: calc(100% - 321px);

    @media screen and (max-width: 1023px) {
      width: 100%;
    }

    .content {
      height: 100%;
      padding: 32px;
      background: #f8f8f8;

      @media screen and (max-width: 1023px) {
        padding: 32px 24px;
      }

      @media screen and (max-width: 520px) {
        padding: 18px 12px;
      }
    }
  }
`;

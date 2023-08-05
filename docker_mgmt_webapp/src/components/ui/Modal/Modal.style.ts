import styled from '@emotion/styled';

type ContainerProps = {
  isOpened: boolean;
};

const Container = styled.div<ContainerProps>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${({ isOpened }) => (isOpened ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`;

const Dialog = styled.div<{ isOpened: boolean }>`
  width: 520px;
  border: 1px solid gray;
  background-color: white;
  border-radius: 4px;
  position: relative;
  padding: 12px 20px;
  box-shadow: 0 20px 60px -20px rgb(16 16 32 / 40%);
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default {
  Container,
  Dialog,
  Header,
};

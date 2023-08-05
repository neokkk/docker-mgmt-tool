import styled from '@emotion/styled';

const Container = styled.div`
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  list-tyle: none;
  margin: 0 0 16px;
  padding: 0;
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(0, 1fr);
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default {
  Container,
  List,
  Nav,
};

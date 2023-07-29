import styled from '@emotion/styled';

const Container = styled.aside`
  height: auto;
  flex: 0 1 200px;
  border-right: 1px solid gray;
  padding: 20px;
`;

const MenuList = styled.ul`
  list-style: none;
  text-decoration: none;

  .active {
    font-weight: 700;
  }
`;

export default {
  Container,
  MenuList,
};

import { PropsWithChildren } from 'react';
import Style from './Layout.style';
import NavBar from './NavBar';
import SideBar from './SideBar';
import Main from './Main';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavBar />
      <Style.Body>
        <SideBar />
        <Main>{children}</Main>
      </Style.Body>
    </>
  );
};

export default Layout;

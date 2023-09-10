import { NavLink } from 'react-router-dom';
import Style from './SideBar.style';
import router from '@/router';

const SideBar = () => {
  return (
    <Style.Container>
      <Style.MenuList>
        {router.routes.map((route) => (
          <li key={route.id}>
            <NavLink to={route.path!} className={({ isActive }) => (isActive ? 'active' : '')}>
              {route.id}
            </NavLink>
          </li>
        ))}
      </Style.MenuList>
    </Style.Container>
  );
};

export default SideBar;

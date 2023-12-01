import { Tabs } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

const NavTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Tabs value={pathname}>
      <Tabs.List justify="center">
        <Tabs.Tab value={ROUTES.HOME} onClick={() => navigate(ROUTES.HOME)}>
          Home
        </Tabs.Tab>
        <Tabs.Tab value={ROUTES.CREATE} onClick={() => navigate(ROUTES.CREATE)}>
          Add new Brand
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default NavTabs;

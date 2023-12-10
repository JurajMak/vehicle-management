import { Tabs } from '@mantine/core';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { FixMeLater } from '../../types';

const NavTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  const handleTabChange = (value: FixMeLater) => {
    navigate(value);
  };

  return (
    <Tabs value={pathname} onChange={handleTabChange}>
      <Tabs.List justify="center">
        <Tabs.Tab value={ROUTES.HOME}>Home</Tabs.Tab>
        <Tabs.Tab value={ROUTES.CREATE}>Add new Brand</Tabs.Tab>
        {pathname.includes('models') && <Tabs.Tab value={`/create/${id}`}>Add new Model</Tabs.Tab>}
      </Tabs.List>
    </Tabs>
  );
};

export default NavTabs;

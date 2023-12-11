import { Tabs } from '@mantine/core';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../routes';
interface OwnProps {
  toggle?: () => void;
}

const NavTabs: React.FC<OwnProps> = ({ toggle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();

  const handleTabChange = (value: string | null) => {
    if (value !== null) {
      navigate(value);
      if (toggle) {
        toggle();
      }
    }
  };

  return (
    <Tabs value={pathname} onChange={handleTabChange} variant="outline">
      <Tabs.List justify="center">
        <Tabs.Tab value={ROUTES.HOME}>Home</Tabs.Tab>
        <Tabs.Tab value={ROUTES.CREATE}>Add new Brand</Tabs.Tab>
        {pathname.includes('models') || pathname === `/create/${id}` ? (
          <Tabs.Tab value={`/create/${id}`}>Add new Model</Tabs.Tab>
        ) : null}
      </Tabs.List>
    </Tabs>
  );
};

export default NavTabs;

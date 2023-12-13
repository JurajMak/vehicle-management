import { useDisclosure } from '@mantine/hooks';
import { AppShell, Box, Burger, Button, Group } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import NavTabs from '../Tabs';
import { ROUTES } from '../../routes';
import { CarFront } from 'lucide-react';

export const Layout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-evenly" style={{ flex: 1 }} visibleFrom="sm">
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              fw={500}
              size="compact-xl"
              variant="transparent"
              leftSection={<CarFront size={25} />}
            >
              Vehicle Management
            </Button>

            <NavTabs />
          </Group>
          <Box mx="auto" hiddenFrom="sm">
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              fw={500}
              size="compact-xl"
              variant="transparent"
              leftSection={<CarFront size={25} />}
            >
              Vehicle Management
            </Button>
          </Box>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <NavTabs toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

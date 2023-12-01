import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import NavTabs from '../Tabs';

export const Layout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="center" style={{ flex: 1 }}>
            <NavTabs />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {/* <UnstyledButton onClick={() => navigate(ROUTES.HOME)}>Home</UnstyledButton>
        <UnstyledButton onClick={() => navigate(ROUTES.CREATE)}>Add Vehicle</UnstyledButton> */}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

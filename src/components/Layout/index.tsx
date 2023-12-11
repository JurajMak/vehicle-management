import { useDisclosure } from '@mantine/hooks';
import { AppShell, Box, Burger, Group, Title } from '@mantine/core';
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
          <Group justify="space-evenly" style={{ flex: 1 }} visibleFrom="sm">
            <Title order={3}>Vehicle Management</Title>
            <NavTabs />
          </Group>
          <Box mx="auto" hiddenFrom="sm">
            <Title order={3}>Vehicle Management</Title>
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

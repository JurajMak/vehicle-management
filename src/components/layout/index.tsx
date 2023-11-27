import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, UnstyledButton } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';

export function Layout() {
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
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group mx="auto" gap={20} visibleFrom="sm">
              <UnstyledButton onClick={() => navigate(Routes.HOME)}>Home</UnstyledButton>
              <UnstyledButton onClick={() => navigate(Routes.CREATE)}>Add Vehicle</UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton onClick={() => navigate(Routes.HOME)}>Home</UnstyledButton>
        <UnstyledButton onClick={() => navigate(Routes.CREATE)}>Add Vehicle</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

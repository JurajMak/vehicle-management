import { RouterProvider } from 'react-router-dom';
import { router } from '../routes';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './Theme';
import { Notifications } from '@mantine/notifications';

const Providers = () => {
  return (
    <>
      <MantineProvider theme={theme}>
        <Notifications />
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
};

export default Providers;

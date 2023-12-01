import { RouterProvider } from 'react-router-dom';
import { router } from '../routes';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './Theme';

const Providers = () => {
  return (
    <>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
};

export default Providers;

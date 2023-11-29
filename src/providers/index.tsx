import { RouterProvider } from 'react-router-dom';
import { router } from '../routes';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const Providers = () => {
  return (
    <>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
};

export default Providers;

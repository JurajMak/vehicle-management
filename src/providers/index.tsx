import { QueryClientProvider } from '@tanstack/react-query';
import { API } from '../services';
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

const Providers = () => {
  return (
    <>
      <QueryClientProvider client={API.Client}>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default Providers;

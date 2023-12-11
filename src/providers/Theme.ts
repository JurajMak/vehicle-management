import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 6,
  colors: {
    primary: [
      '#1C2C3E',
      '#19283A',
      '#162436',
      '#132032',
      '#111B2D',
      '#0F172A',
      '#0D1526',
      '#0B1323',
      '#070F20',
      '#040A16',
    ],
  },
  defaultRadius: 'md',
  components: {
    Modal: {
      defaultProps: {
        centered: true,
        overlayProps: {
          backgroundOpacity: 0.55,
          blur: 3,
        },
      },
    },
  },
});

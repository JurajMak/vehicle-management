import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  primaryShade: 6,
  colors: {
    primary: [
      '#f2f0ff',
      '#e0dff2',
      '#bfbdde',
      '#9b98ca',
      '#7d79ba',
      '#6a65b0',
      '#605bac',
      '#504c97',
      '#464388',
      '#3b3979',
    ],
  },
  defaultRadius: 'md',
  // components: {
  //   Modal: {
  //     defaultProps: {
  //       centered: true,
  //       overlayProps: {
  //         backgroundOpacity: 0.55,
  //         blur: 3,
  //       },
  //     },
  //   },
  // },
});

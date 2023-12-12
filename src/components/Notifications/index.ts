import { notifications } from '@mantine/notifications';

export const successCreation = (item: string) => {
  notifications.show({
    color: 'green',
    title: 'Success',
    message: `Successful creation of new vehicle ${item}`,
    autoClose: 2000,
  });
};

export const successEdit = (item: string) => {
  notifications.show({
    color: 'green',
    title: 'Success',
    message: `Successful edit of ${item}`,
    autoClose: 2000,
  });
};

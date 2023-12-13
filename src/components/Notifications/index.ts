import { notifications } from '@mantine/notifications';

export const successCreation = (item: string) => {
  notifications.show({
    color: 'green',
    title: 'Success',
    message: `Successful creation of ${item} brand`,
    autoClose: 4000,
  });
};

export const successEdit = (item: string) => {
  notifications.show({
    color: 'green',
    title: 'Success',
    message: `Successful edit of ${item}`,
    autoClose: 4000,
  });
};
export const successDeletion = (item: string) => {
  notifications.show({
    color: 'green',
    title: 'Success',
    message: `Successfully deleted vehicle ${item}`,
    autoClose: 4000,
  });
};

export const errorNotification = () => {
  notifications.show({
    color: 'red',
    title: 'Error',
    message: `Incomplete form, please fill out all required fields!`,
    autoClose: 4000,
  });
};

import { notifications } from '@mantine/notifications';

export const successCreation = (item: string) => {
  notifications.show({
    color: 'green',
    title: 'Success',
    message: `Successful creation of new vehicle ${item}`,
    autoClose: 2000,
  });
};

export const successEdit = (brand: string | null, model?: string) => {
  notifications.show({
    color: 'green',
    title: 'Success',
    message: `Successful edit of ${brand} ${model}`,
    autoClose: 2000,
  });
};

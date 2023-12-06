import { Text } from '@mantine/core';

interface OwnProps {
  error: string;
}

const FormError = ({ error }: OwnProps) => {
  return (
    <Text mt={5} c="red">
      {error}
    </Text>
  );
};

export default FormError;

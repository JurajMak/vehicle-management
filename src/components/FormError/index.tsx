import { Text } from '@mantine/core';

interface OwnProps {
  error: string;
}

const FormError: React.FC<OwnProps> = ({ error }) => {
  return (
    <Text mt={5} c="red">
      {error}
    </Text>
  );
};

export default FormError;

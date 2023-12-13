import { Text, TextInput } from '@mantine/core';
import { Field } from 'mobx-react-form';
interface OwnProps {
  formError: string;
  errorText: string;
  field: Field;
}

const CustomInput: React.FC<OwnProps> = ({ field, formError, errorText }) => {
  return (
    <>
      <TextInput {...field} />
      {formError && (
        <Text mt={5} c="red.8">
          {errorText}
        </Text>
      )}
    </>
  );
};

export default CustomInput;

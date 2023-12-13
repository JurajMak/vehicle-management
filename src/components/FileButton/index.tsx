import { Button, Input } from '@mantine/core';
import React from 'react';

interface OwnProps {
  variant: string;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileButton: React.FC<OwnProps> = ({ variant, text, onChange }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleBtnClick = () => {
    if (inputRef.current === null) {
      return;
    }
    inputRef.current.click();
  };
  return (
    <>
      <Button variant={variant} onClick={handleBtnClick}>
        {text}
      </Button>

      <Input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={onChange}
        accept="image/png,image/jpeg"
      ></Input>
    </>
  );
};

export default FileButton;

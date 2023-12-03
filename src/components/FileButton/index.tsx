import { Box, Button, Input } from '@mantine/core';
import React from 'react';

interface OwnProps {
  variant: string;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileButton = ({ variant, text, onChange }: OwnProps) => {
  const inputRef = React.useRef<any>(null);

  const handleBtnClick = () => {
    inputRef.current.click();
  };
  return (
    <>
      <Button variant={variant} className="text-black" onClick={handleBtnClick}>
        {text}
      </Button>

      <Input type="file" ref={inputRef} style={{ display: 'none' }} onChange={onChange}></Input>
    </>
  );
};

export default FileButton;

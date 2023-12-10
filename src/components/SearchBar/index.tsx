import { TextInput } from '@mantine/core';
import React from 'react';
import { Search } from 'lucide-react';

interface OwnProps {
  onChange: (searchQuery: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<OwnProps> = ({ onChange, initialValue = '' }) => {
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputValue.length === 0) {
      onChange(inputValue);
      inputRef.current?.focus();
    }
    inputRef.current?.focus();
  }, [inputValue]);

  return (
    <TextInput
      miw="15dvw"
      value={inputValue}
      onChange={e => {
        setInputValue(e.target.value);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onChange(inputValue);
        }
      }}
      ref={inputRef}
      placeholder="Search..."
      radius="md"
      leftSection={<Search size={20} />}
    />
  );
};

export default SearchBar;

import React from 'react';
import { Select } from '@mantine/core';
import { ISelectItem } from '../../types';

interface OwnProps {
  onChange: (sort: string | null) => void;
  data: ISelectItem[];
  initialValue?: string;
}

const CustomSelect: React.FC<OwnProps> = ({ data, initialValue = '', onChange }) => {
  return (
    <Select
      placeholder="Sort by..."
      data={data}
      value={initialValue}
      clearable
      onChange={value => {
        onChange(value);
      }}
    />
  );
};

export default CustomSelect;

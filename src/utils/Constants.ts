export interface ISelectItem {
  label: string;
  value: string;
}

export const SELECT_MAKE_DATA: ISelectItem[] = [
  {
    label: 'Sort by Name Asc',
    value: 'NameA ',
  },
  {
    label: 'Sort by Name Desc',
    value: 'NameD ',
  },
  {
    label: 'Sort by Country Asc',
    value: 'CountryA ',
  },
  {
    label: 'Sort by Country Desc',
    value: 'CountryD ',
  },
];

export const SELECT_MODEL_DATA: ISelectItem[] = [
  {
    label: 'Sort by Name Asc',
    value: 'NameA ',
  },
  {
    label: 'Sort by Name Desc',
    value: 'NameD ',
  },
  {
    label: 'Sort by Year Asc',
    value: 'yearA ',
  },
  {
    label: 'Sort by Year Desc',
    value: 'yearD ',
  },
];

import React from 'react';

import { SearchOutlined } from '@/assets/icons/search-outlined';

import { Input } from '../input';
import { ColumnFilter } from './table';

type SetColumnFiltersCallback = (prev: ColumnFilter[]) => ColumnFilter[];

type FilterProps = {
  columnFilters: ColumnFilter[];
  columnId: string;
  setColumnFilters: (prev: ColumnFilter[] | SetColumnFiltersCallback) => void;
};

export const Filter = (props: FilterProps) => {
  const { columnFilters, columnId, setColumnFilters } = props;

  const taskName = columnFilters.find(f => f.id === columnId)?.value || '';

  const onFilterChange = (id: string, value: string) =>
    setColumnFilters(prev =>
      prev
        .filter(f => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <>
      <Input
        onChange={e => onFilterChange(columnId, e.target.value)}
        placeholder={'Search'}
        startAdornment={<SearchOutlined />}
        value={taskName}
      />
    </>
  );
};

import React, { useState } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import s from './table.module.scss';

import { Checkbox } from '../checkbox';
import { Typography } from '../typography';
import { Filter } from './table-filter';

type Title = {
  accessorKey: string;
  header: string;
};
type TableProps<T> = {
  autoupdateButton?: boolean;
  content: T[];
  searchable?: boolean;
  title: Title[];
};

export type ColumnFilter = {
  id: string;
  value: string;
};

export const Table = <T,>(props: TableProps<T>) => {
  const { autoupdateButton, content, searchable, title } = props;

  const [data, setData] = useState(content);
  const [checkboxValue, setCheckboxValue] = useState(true);

  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const columns: ColumnDef<(typeof content)[0]>[] = title.map(i => ({
    ...i,
    cell: props => <Typography.Regular14>{props.getValue()}</Typography.Regular14>,
  }));

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className={s.container} style={{ width: `${table.getTotalSize()}` }}>
      {autoupdateButton && (
        <div className={s.checkboxContainer}>
          <Checkbox
            checked={checkboxValue}
            label={'Autoupdate'}
            onChange={() => setCheckboxValue(!checkboxValue)}
          />
        </div>
      )}

      {searchable && (
        <div className={s.inputContainer}>
          <Filter
            columnFilters={columnFilters}
            columnId={'paymentType'}
            setColumnFilters={setColumnFilters}
          />
        </div>
      )}

      {table.getHeaderGroups().map(i => (
        <div className={`${s.tableRow} ${s.tableHeader}`} key={i.id}>
          {i.headers.map(h => (
            <div key={h.id} style={{ width: `${h.getSize()}` }}>
              <Typography.Bold14>{h.column.columnDef.header}</Typography.Bold14>
            </div>
          ))}
        </div>
      ))}

      {table.getRowModel().rows.map(row => (
        <div className={s.tableRow} key={row.id}>
          {row.getVisibleCells().map(cell => (
            <div
              //   className={s.tableCell}
              key={cell.id}
              style={{ width: `${cell.column.getSize()}` }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

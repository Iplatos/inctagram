import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react';

import Image from 'next/image';

import s from './table.module.scss';

import ArrowDown from '../../../assets/icons/arrow-down.svg?url';
import Arrow from '../../../assets/icons/arrow-up.svg?url';
import { Typography } from '../typography';
import { PaymentData } from './table';

export type Cols = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type ThProps = {
  col?: Cols;
} & ComponentPropsWithoutRef<'th'>;
type TdProps = {
  col?: Cols;
} & ComponentPropsWithoutRef<'td'>;
export const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <table {...rest} className={`${className} ${s.root}`} ref={ref} />;
  }
);

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <thead {...rest} className={`${className} ${s.tableHead}`} ref={ref} />;
  }
);

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <tr {...rest} className={`${className} ${s.tableRow}`} ref={ref} />;
  }
);

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <tbody {...rest} className={`${className} ${s.tableBody}`} ref={ref} />;
  }
);

export const TableHeadCell = forwardRef<ElementRef<'th'>, ThProps>((props, ref) => {
  const { className, col, ...rest } = props;

  return <th {...rest} className={`${className} ${s.tableHeadCell}`} data-col={col} ref={ref} />;
});

export const TableDataCell = forwardRef<ElementRef<'td'>, TdProps>((props, ref) => {
  const { className, col, ...rest } = props;

  return <td {...rest} className={`${className} ${s.tableDataCell}`} data-col={col} ref={ref} />;
});

export type Column = {
  key: string;
  sortable?: boolean;
  title: string;
  width?: string;
};
export type Sort = {
  direction: 'asc' | 'desc';
  key: string | undefined;
} | null;

type TableHeaderProps = {
  columns: Column[];
  onSort?: (sort: Sort) => void;
  sort?: Sort;
} & Omit<ComponentPropsWithoutRef<'thead'>, 'children'>;

export const TableHeader = ({ columns, onSort, sort, ...restProps }: TableHeaderProps) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return;
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'desc', key });
    }

    if (sort.direction === 'asc') {
      return onSort(null);
    }

    return onSort({
      direction: sort?.direction === 'desc' ? 'asc' : 'desc',
      key,
    });
  };

  return (
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ key, sortable = true, title, width }) => (
          <TableHeadCell key={key} onClick={handleSort(key, sortable)} style={{ width: width }}>
            <span className={s.headblock}>
              <Typography.H3>{title}</Typography.H3>
              {sort && sort.key === key && (
                <span>
                  {sort.direction === 'asc' ? (
                    <Image alt={'down'} className={s.icon} height={15} src={ArrowDown} width={15} />
                  ) : (
                    <Image alt={'up'} className={s.icon} height={15} src={Arrow} width={15} />
                  )}
                </span>
              )}
            </span>
          </TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type TableBodyRowsProps = {
  data: PaymentData[];
};

export const TableBodyRows = (props: TableBodyRowsProps) => {
  const id = useId();

  return (
    <TableBody>
      {props.data.map(el => (
        <TableRow key={id}>
          {Object.entries(el).map(el => (
            <TableDataCell key={id}>{el[1]}</TableDataCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

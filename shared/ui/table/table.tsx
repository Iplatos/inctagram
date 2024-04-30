import { v1 } from 'uuid';

import {
  Column,
  Sort,
  Table,
  TableBody,
  TableBodyRows,
  TableDataCell,
  TableHeader,
  TableRow,
} from './table-parts';

export type PaymentData = {
  dateOfPayment: string;
  endDateOfSubscription: string;
  paymentType: string;
  price: string;
  subscriptionType: string;
};

export type TableProps = {
  columns: Column[];
  data: PaymentData[];
  onSort: (sort: Sort) => void;
  sort: Sort | undefined;
};

export const TableComponent = (props: TableProps) => {
  return (
    <Table>
      <TableHeader columns={props.columns} onSort={props.onSort} sort={props.sort}></TableHeader>
      <TableBodyRows data={props.data} />
    </Table>
  );
};

import {
  Column,
  Sort,
  Table,
  TableBody,
  TableDataCell,
  TableHeader,
  TableRow,
} from './table-parts';

export type PaymentData = {
  dateOfPayment: string;
  endDateOfSubscription: string;
  id: string;
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
      <TableBody>
        {props.data.map(el => (
          <TableRow key={el.id}>
            <TableDataCell>{el.dateOfPayment}</TableDataCell>
            <TableDataCell>{el.endDateOfSubscription}</TableDataCell>
            <TableDataCell>{el.price}</TableDataCell>
            <TableDataCell>{el.subscriptionType}</TableDataCell>
            <TableDataCell>{el.paymentType}</TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

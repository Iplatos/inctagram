import { Column, Sort, Table, TableBodyRows, TableHeader } from './table-parts';

export type PaymentData = {
  dateOfPayment: string;
  endDateOfSubscription: string;
  paymentType: 'PAYPAL' | 'STRIPE';
  price: string;
  subscriptionType: 'DAY' | 'MONTHLY' | 'WEEKLY';
};

export type TableProps = {
  columns: Column[];
  data: any[];
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

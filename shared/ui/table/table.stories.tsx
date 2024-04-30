import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { TableComponent } from './table';
import { Column, Sort } from './table-parts';

const meta = {
  argTypes: {},
  component: TableComponent,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof TableComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const data = [
  {
    dateOfPayment: '12-12-2024',
    endDateOfSubscription: '12-12-2024',
    paymentType: 'Stripe',
    price: '50$',
    subscriptionType: '7 days',
  },
  {
    dateOfPayment: '12-12-2024',
    endDateOfSubscription: '12-12-2024',
    paymentType: 'Paypal',
    price: '100$',
    subscriptionType: '1 month',
  },
  {
    dateOfPayment: '12-12-2024',
    endDateOfSubscription: '12-12-2024',
    paymentType: 'Paypal',
    price: '10$',
    subscriptionType: '1 day',
  },
];

const columns: Column[] = [
  {
    key: 'paymentdate',
    title: 'Date of Payment',
    width: '200px',
  },
  {
    key: 'endsubscription',
    title: 'End date of subscription',
    width: '250px',
  },
  {
    key: 'price',
    title: 'Price',
    width: '120px',
  },
  {
    key: 'subscription',
    title: 'Subscription Type',
    width: '200px',
  },
  {
    key: 'payment',
    title: 'Payment Type',
    width: '200px',
  },
];

export const Default: Story = {
  args: {
    columns: columns,
    data: data,
    onSort: undefined,
    sort: undefined,
  },
  render: function Render() {
    const [localsort, setSort] = useState<Sort | undefined>(null);
    const onSort = (sort: Sort) => {
      if (localsort && localsort.key === sort?.key) {
        setSort({
          direction: localsort.direction === 'asc' ? 'desc' : 'asc',
          key: sort?.key,
        });
      } else {
        setSort({
          direction: 'desc',
          key: sort?.key,
        });
      }
    };

    return <TableComponent columns={columns} data={data} onSort={onSort} sort={localsort} />;
  },
};

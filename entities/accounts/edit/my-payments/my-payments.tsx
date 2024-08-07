import React from 'react';

import { ArrowFilter } from '@/assets/icons/arrow-filter';
import { Typography } from '@/shared/ui';
import { Table } from '@/shared/ui/table/table';
import { ColumnDef } from '@tanstack/react-table';

import s from './my-payments.module.scss';

type Content = {
  dateOfPayment: string;
  endDateOfSubscription: string;
  paymentType: string;
  price: number;
  subscriptionType: string;
};

const content: Content[] = [
  {
    dateOfPayment: '2024-08-06',
    endDateOfSubscription: '2024-08-06',
    paymentType: 'STRIPE',
    price: 55,
    subscriptionType: 'MONTHLY',
  },
  {
    dateOfPayment: '2024-08-06',
    endDateOfSubscription: '2024-08-06',
    paymentType: 'STRIPE',
    price: 55,
    subscriptionType: 'MONTHLY',
  },
  {
    dateOfPayment: '2024-08-06',
    endDateOfSubscription: '2024-08-06',
    paymentType: 'STRIPE',
    price: 55,
    subscriptionType: 'MONTHLY',
  },
  {
    dateOfPayment: '2024-08-06',
    endDateOfSubscription: '2024-08-06',
    paymentType: 'STRIPE',
    price: 55,
    subscriptionType: 'MONTHLY',
  },
  {
    dateOfPayment: '2024-08-06',
    endDateOfSubscription: '2024-08-06',
    paymentType: 'PayPal',
    price: 55,
    subscriptionType: 'MONTHLY',
  },
];

const title = [
  {
    accessorKey: 'dateOfPayment',
    header: 'Date of Payment',
  },
  {
    accessorKey: 'endDateOfSubscription',
    header: 'End date of subscription',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'subscriptionType',
    header: 'Subscription Type',
  },
  {
    accessorKey: 'paymentType',
    header: 'Payment Type',
  },
];

export const MyPayments = () => {
  return <Table autoupdateButton content={content} searchable title={title} />;
};

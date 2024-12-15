import React, { useState } from 'react';

import { myPayment, useGetMyPaymentsQuery } from '@/shared/api/subscriptions-api';
import { useTranslation } from '@/shared/hooks';
import { Pagination } from '@/shared/ui';
import { TableComponent } from '@/shared/ui/table/table';
import { Column, Sort } from '@/shared/ui/table/table-parts';

const data = [
  {
    dateOfPayment: '09-12-2024',
    endDateOfSubscription: '11-12-2024',
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

export const MyPayments = () => {
  const { editProfile: t } = useTranslation().t;
  const { data } = useGetMyPaymentsQuery();
  const [localsort, setSort] = useState<Sort | undefined>(null);

  const columns: Column[] = [
    {
      key: 'paymentdate',
      title: t.myPayments.dateOfPayment,
      width: '200px',
    },
    {
      key: 'endsubscription',
      title: t.myPayments.endDateOfSubscription,
      width: '250px',
    },
    {
      key: 'price',
      title: t.myPayments.price,
      width: '120px',
    },
    {
      key: 'subscription',
      title: t.myPayments.subscriptionType,
      width: '200px',
    },
    {
      key: 'payment',
      title: t.myPayments.paymentType,
      width: '200px',
    },
  ];

  const tableData = data?.map((el: myPayment) => ({
    dateOfPayment: el.dateOfPayment,
    endDateOfSubscription: el.endDateOfSubscription,
    paymentType: el.paymentType,
    price: el.price,
    subscriptionType: el.subscriptionType,
  }));
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

  return (
    <div>
      <TableComponent columns={columns} data={tableData ?? []} onSort={onSort} sort={localsort} />
    </div>
  );
};

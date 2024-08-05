import React, { useState } from 'react';

import { PayPal } from '@/assets/icons/payPal';
import { Stripe } from '@/assets/icons/stripe';
import { Card, RadioGroup, RadioGroupOption, Typography } from '@/shared/ui';

import s from './account-management.module.scss';

const accountType: RadioGroupOption[] = [
  {
    label: 'Personal',
    value: '1',
  },
  {
    label: 'Business',
    value: '2',
  },
];

const subscriptionType: RadioGroupOption[] = [
  {
    label: '$10 per 1 Day',
    value: '1',
  },
  {
    label: '$50 per 7 Day',
    value: '2',
  },
  {
    label: '$100 per month',
    value: '3',
  },
];

export const AccountManagement = () => {
  const [account, setAccount] = useState('1');
  const [subscription, setSubscription] = useState('1');

  return (
    <div>
      <Typography.H3>Account type:</Typography.H3>
      <Card className={s.card}>
        <RadioGroup onValueChange={e => setAccount(e)} options={accountType} value={account} />
      </Card>

      {account === '2' && (
        <div className={s.businessContainer}>
          <Typography.H3>Your subscription costs:</Typography.H3>
          <Card className={s.card}>
            <RadioGroup
              onValueChange={e => setSubscription(e)}
              options={subscriptionType}
              value={subscription}
            />
          </Card>

          <div className={s.payment}>
            <div className={s.paymentContainer}>
              <Card className={s.paymentCard}>
                <PayPal />
              </Card>
              <p>or</p>
              <Card className={s.paymentCard}>
                <Stripe />
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

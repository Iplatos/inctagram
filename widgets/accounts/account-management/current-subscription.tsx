import { useState } from 'react';

import {
  useCancelAutoRenewalMutation,
  useGetCurrentSubscriptionQuery,
} from '@/shared/api/subscriptions-api';
import { useTranslation } from '@/shared/hooks';
import { Card, Checkbox, Typography } from '@/shared/ui';

import s from './../../../entities/accounts/edit/account-management/account-management.module.scss';

export const CurrentSubscription = () => {
  const { data } = useGetCurrentSubscriptionQuery();
  const [cancelAutoRenewal, {}] = useCancelAutoRenewalMutation();
  const [isChecked, setIsChecked] = useState(false);
  const { editProfile: t } = useTranslation().t;

  const handleCheckboxChange = (checked: any) => {
    if (isChecked && !checked) {
      cancelAutoRenewal();
    }
    setIsChecked(checked);
  };

  const endDate = data?.data[0]?.endDateOfSubscription.split('T')[0].replace(/-/g, '.') ?? '';
  const paymentDate = data?.data[0]?.dateOfPayment.split('T')[0].replace(/-/g, '.') ?? '';

  return (
    <>
      {data?.data && data?.data.length > 0 && (
        <div className={s.card}>
          <Typography.H3 className={s.header}>
            {t.accountManagement.currentSubscription}
          </Typography.H3>
          <Card>
            <Card.Content className={s['current-subscription-content']}>
              <div className={s.date}>
                <Typography.Regular14 className={s['date-header']}>
                  {t.accountManagement.expireAt}
                </Typography.Regular14>
                <div>
                  <Typography.Medium14>{endDate}</Typography.Medium14>{' '}
                </div>
              </div>
              <div className={s.date}>
                {' '}
                <Typography.Regular14 className={s['date-header']}>
                  {t.accountManagement.nextPayment}
                </Typography.Regular14>
                <div>
                  <Typography.Medium14>{paymentDate}</Typography.Medium14>
                </div>
              </div>
            </Card.Content>
          </Card>
          <div className={s.autorenewalCheckbox}>
            <Checkbox
              checked={data.data[0].autoRenewal}
              disabled={data.data.length > 0 ? false : true}
              label={'Auto-Renewal'}
              onChange={checked => {
                handleCheckboxChange(checked);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

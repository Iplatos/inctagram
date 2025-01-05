import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  createSubscriptionRequest,
  useCreateSubscriptionMutation,
  useGetCostOfSubscriptionsQuery,
  useGetCurrentSubscriptionQuery,
} from '@/shared/api/subscriptions-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button, Card, Checkbox, DEPRECATED_Card, RadioGroup, Typography } from '@/shared/ui';
import { GitHubGoogleContainer } from '@/widgets/auth/gitHubGoogleContainer/gitHubGoogleContainer';
import { useRouter } from 'next/router';

import s from './../../../entities/accounts/edit/account-management/account-management.module.scss';

import PaypalIcon from './../../../assets/icons/paypal.svg';
import StripeIcon from './../../../assets/icons/stripe.svg';
import { ErrorSuccessModal } from './modals/error-success-modal';

type CostData = {
  amount: number;
  typeDescription: string;
};

export const SubscriptionForm = () => {
  const { editProfile: t } = useTranslation().t;
  const router = useRouter();

  const { data: costs } = useGetCostOfSubscriptionsQuery();
  const [createSubscription, { data: subscriptionData, isError }] = useCreateSubscriptionMutation();

  const { push, query } = useRouter();
  const [success, setSuccess] = useState(query.success === 'true');
  const [error, setError] = useState(query.success === 'false');

  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError]);

  const closeErrorModal = () => setError(false);
  const closeSuccessModal = () => setSuccess(false);

  const onSubmit = (data: any) => {
    const filteredCosts = costs.data.filter(
      (el: CostData) => el.typeDescription === data.typeSubscription
    );

    data.amount = filteredCosts[0]?.amount;

    data.baseUrl = 'https://inctagram.work';

    return createSubscription(data);
  };

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      amount: 0,
      paymentType: '',
      typeSubscription: '',
    },
    mode: 'onTouched',
  });

  if (subscriptionData) {
    router.push(subscriptionData.url);
  }

  const options = [
    {
      label: `$${costs?.data[0].amount} per 1 Day`,
      value: `${costs?.data[0].typeDescription}`,
    },
    {
      label: `$${costs?.data[1].amount} per 7 Day`,
      value: `${costs?.data[1].typeDescription}`,
    },
    {
      label: `$${costs?.data[2].amount} per month`,
      value: `${costs?.data[2].typeDescription}`,
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.card}>
          <Typography.H3 className={s.header}>
            {t.accountManagement.yourSubscriptionCosts}
          </Typography.H3>
          <Card>
            <Card.Content>
              <RadioGroup
                onValueChange={value => setValue('typeSubscription', value)}
                options={costs ? options : [{ value: '' }]}
              ></RadioGroup>
            </Card.Content>
          </Card>
          <div className={s.buttons}>
            <Button
              name={'paymentType'}
              onClick={() => setValue('paymentType', 'PAYPAL')}
              type={'submit'}
              variant={'text'}
            >
              <PaypalIcon />
            </Button>
            <Typography.Regular14 className={s.conjunction}>
              {t.accountManagement.or}
            </Typography.Regular14>
            <Button
              name={'paymentType'}
              onClick={() => setValue('paymentType', 'STRIPE')}
              type={'submit'}
              variant={'text'}
            >
              <StripeIcon />
            </Button>
          </div>
        </div>
      </form>
      <ErrorSuccessModal
        buttonText={t.accountManagement.modal.successButton}
        contentText={t.accountManagement.modal.successContent}
        headerText={t.accountManagement.modal.successTitle}
        onClose={closeSuccessModal}
        show={success}
      />
      <ErrorSuccessModal
        buttonText={t.accountManagement.modal.errorButton}
        contentText={t.accountManagement.modal.errorContent}
        headerText={t.accountManagement.modal.errorTitle}
        onClose={closeErrorModal}
        show={error}
      />
    </>
  );
};

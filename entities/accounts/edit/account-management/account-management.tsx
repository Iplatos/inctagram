import React, { useState } from 'react';

import { AccountTypeSelector } from '@/widgets/accounts/account-management/account-type-selector';
import { CurrentSubscription } from '@/widgets/accounts/account-management/current-subscription';
import { SubscriptionForm } from '@/widgets/accounts/account-management/subscription-form';

export const AccountManagement = () => {
  const [accType, setAccType] = useState<string>('personal');

  return (
    <>
      <CurrentSubscription />
      <AccountTypeSelector onAccTypeChange={setAccType} />
      {accType === 'business' && <SubscriptionForm />}
    </>
  );
};

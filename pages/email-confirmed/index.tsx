import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

function ConfirmedEmailPage() {
  return (
    <>
      <HeadMeta title={'Email Confirmed'} />
      Confirm Email
    </>
  );
}

ConfirmedEmailPage.getLayout = getLayout;
export default ConfirmedEmailPage;

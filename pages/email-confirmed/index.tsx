import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { RedirectContent } from '@/components/auth';

function ConfirmedEmailPage() {
  return (
    <>
      <HeadMeta title={'Email Confirmed'} />
      {/* <RedirectContent linkExpired /> */}
      <RedirectContent emailConfirmed />
    </>
  );
}

ConfirmedEmailPage.getLayout = getLayout;
export default ConfirmedEmailPage;

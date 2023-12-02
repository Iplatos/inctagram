import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { RedirectContent } from '@/widgets/auth';

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

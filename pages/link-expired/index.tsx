import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { RedirectContent } from '@/components/auth';

function LinkExpiredPage() {
  return (
    <>
      <HeadMeta title={'Link Expired'} />
      <RedirectContent linkExpired />
    </>
  );
}

LinkExpiredPage.getLayout = getLayout;
export default LinkExpiredPage;

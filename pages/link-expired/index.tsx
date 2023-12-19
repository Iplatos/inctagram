import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { RedirectContent } from '@/widgets/auth';

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

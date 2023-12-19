import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { RedirectContent } from '@/widgets/auth';
import { PaginationItems } from '@/entities/pagination-items/pagination-items';

function LinkExpiredPage() {
  return (
    <>
      <HeadMeta title={'Link Expired'} />
      {/* <RedirectContent linkExpired /> */}
      <PaginationItems />
    </>
  );
}

LinkExpiredPage.getLayout = getLayout;
export default LinkExpiredPage;

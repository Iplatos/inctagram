import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function TermsOfService() {
  return (
    <>
      <HeadMeta title={'Terms of Service'} />
      Terms of Service
    </>
  );
}

TermsOfService.getLayout = getLayout;
export default TermsOfService;

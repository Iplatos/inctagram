import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

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

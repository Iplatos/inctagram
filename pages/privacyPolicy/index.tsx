import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

function PrivacyPolicy() {
  return (
    <>
      <HeadMeta title={' Terms of Service'} />
      Privacy Policy
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

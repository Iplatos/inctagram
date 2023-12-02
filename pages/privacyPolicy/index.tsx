import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

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

import React from 'react';

import { ControlledTextField } from '@/components/ControlledTextField';
import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

function PrivacyPolicy() {
  return (
    <>
      <HeadMeta title={' Terms of Service'} />
      Privacy Policy
      <ControlledTextField />
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

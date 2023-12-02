import React from 'react';

import { PrivacyPolicyContent } from '@/entities';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function PrivacyPolicy() {
  return (
    <>
      <HeadMeta title={'Privacy policy'} />
      <PrivacyPolicyContent />
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

import React from 'react';

import { AgreementContent } from '@/entities';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function PrivacyPolicy() {
  return (
    <>
      <HeadMeta title={'Privacy policy'} />
      <AgreementContent privacyPolicy />
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

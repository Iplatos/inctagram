import React from 'react';

import { AgreementContent } from '@/entities';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function TermsOfService() {
  return (
    <>
      <HeadMeta title={'Terms of Service'} />
      <AgreementContent termsOfService />
    </>
  );
}

TermsOfService.getLayout = getLayout;
export default TermsOfService;

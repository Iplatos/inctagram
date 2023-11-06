import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';

function ConfirmRegistration() {
  return (
    <>
      <HeadMeta title={'Confirm Registration'} />
      Confirm Registration
    </>
  );
}

ConfirmRegistration.getLayout = getLayout;
export default ConfirmRegistration;

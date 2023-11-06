import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { SignInForm } from '@/components/SignInForm';

function PrivacyPolicy() {
  return (
    <>
      <HeadMeta title={' Terms of Service'} />
      Privacy Policy
      <SignInForm />
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

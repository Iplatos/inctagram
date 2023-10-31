import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { useLoginQuery } from '@/pages/api/auth.service';

function PrivacyPolicy() {
  const { data } = useLoginQuery({
    email: 'iko58113@zslsz.com',
    password: 'some@p@1ssword',
    username: 'John-D1oe',
  });

  return (
    <>
      <HeadMeta title={' Terms of Service'} />
      Privacy Policy
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

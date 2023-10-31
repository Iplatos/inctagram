import React, { useState } from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { TextField } from '@/components/textField/textField';

function PrivacyPolicy() {
  const [a, setA] = useState('');

  return (
    <>
      <HeadMeta title={' Terms of Service'} />
      Privacy Policy
      <TextField isSearchInput onChangeValue={setA} value={a} />
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

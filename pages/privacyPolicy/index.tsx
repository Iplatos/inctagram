import React, { useState } from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { TextField } from '@/shared/ui/textField/TextField';

function PrivacyPolicy() {
  const [a, setA] = useState('');

  return (
    <>
      <HeadMeta title={' Terms of Service'} />
      Privacy Policy
      <TextField isSearchInput label={'asd'} onChange={setA} value={a} />
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

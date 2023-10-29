import React, { useState } from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { TextField } from '@/components/textField/textField';

function PrivacyPolicy() {
  const [value, setValue] = useState('as');

  return (
    <>
      <HeadMeta title={' Terms of Service'} />
      Privacy Policy
      <TextField
        as={'textarea'}
        inputType={'password'}
        label={'label'}
        onChangeValue={setValue}
        value={value}
      />
    </>
  );
}

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { Trans } from '@/components/Trans/Trans';
import { useTranslation } from '@/shared/hooks/useTranslation';

function SignUp() {
  const { t } = useTranslation();

  return (
    <>
      <HeadMeta title={'Sign Up'} />
      Sign Up page
      <span>
        <Trans
          text={t.auth.signUpPage.agreement}
          tags={{
            '1': () => <b>test1</b>,
            '2': () => <b>test2</b>,
          }}
        />
      </span>
    </>
  );
}

SignUp.getLayout = getLayout;
export default SignUp;

import React, { useEffect } from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { useRouter, useSearchParams } from 'next/navigation';
import { useConfirmCodeMutation } from 'shared/api/auth.service';

function ConfirmRegistration() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const code = searchParams.get('code');
  const router = useRouter();
  const [confirmCode] = useConfirmCodeMutation();

  useEffect(() => {
    if (code && userId) {
      confirmCode({ code, userId });
      console.log(userId);
      router.push('/email-confirmed');
    }
  }, [code, userId]);

  return (
    <>
      <HeadMeta title={'Confirm Registration'} />
    </>
  );
}

ConfirmRegistration.getLayout = getLayout;
export default ConfirmRegistration;

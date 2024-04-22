import React, { useEffect } from 'react';

import { useConfirmCodeMutation } from '@/shared/api/auth-api';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { useRouter, useSearchParams } from 'next/navigation';

function ConfirmRegistration() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const code = searchParams.get('code');
  const router = useRouter();
  const [confirmCode] = useConfirmCodeMutation();

  useEffect(() => {
    if (code && userId) {
      confirmCode({ code, userId });
      router.push('/email-confirmed');
    }
  }, [confirmCode, router, code, userId]);

  return (
    <>
      <HeadMeta title={'Confirm Registration'} />
    </>
  );
}

ConfirmRegistration.getLayout = getLayout;
export default ConfirmRegistration;

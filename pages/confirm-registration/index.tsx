import { useEffect } from 'react';

import { useConfirmCodeMutation } from '@/shared/api/auth-api';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Layout } from '@/widgets/Layout/Layout';
import { useRouter, useSearchParams } from 'next/navigation';

import { NextPageWithLayout } from '../_app';

const ConfirmRegistration: NextPageWithLayout = () => {
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
  }, [code, userId, confirmCode, router]);

  return (
    <>
      <HeadMeta title={'Confirm Registration'} />
    </>
  );
};

ConfirmRegistration.getLayout = page => <Layout>{page}</Layout>;
export default ConfirmRegistration;

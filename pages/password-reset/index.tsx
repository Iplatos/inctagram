import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { PasswordResetForm } from '@/widgets/auth';

import { NextPageWithLayout } from '../_app';

const PasswordReset: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Create new password'} />

      <PasswordResetForm />
    </>
  );
};

PasswordReset.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default PasswordReset;

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Layout } from '@/widgets/Layout/Layout';
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

PasswordReset.getLayout = page => <Layout>{page}</Layout>;
export default PasswordReset;

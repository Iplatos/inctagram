import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
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

PasswordReset.getLayout = getLayout;
export default PasswordReset;

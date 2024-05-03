import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getBaseLayout } from '@/widgets/Layout/BaseLayout';
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

PasswordReset.getLayout = getBaseLayout;
export default PasswordReset;

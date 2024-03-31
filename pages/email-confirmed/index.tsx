import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { RedirectContent } from '@/widgets/auth/redirect-content/redirect-content';

import { NextPageWithLayout } from '../_app';

const ConfirmedEmailPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Email Confirmed'} />
      {/* <RedirectContent linkExpired /> */}
      <RedirectContent emailConfirmed />
    </>
  );
};

ConfirmedEmailPage.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default ConfirmedEmailPage;

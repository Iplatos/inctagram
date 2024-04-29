import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
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

ConfirmedEmailPage.getLayout = getLayout;
export default ConfirmedEmailPage;

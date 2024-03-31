import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { RedirectContent } from '@/widgets/auth';

import { NextPageWithLayout } from '../_app';

const LinkExpiredPage: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Link Expired'} />
      <RedirectContent linkExpired />
    </>
  );
};

LinkExpiredPage.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default LinkExpiredPage;

import { AgreementContent } from '@/entities';
import { AuthLayout } from '@/widgets/AuthLayout/AuthLayout';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';

import { NextPageWithLayout } from '../_app';

const PrivacyPolicy: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Privacy policy'} />
      <AgreementContent privacyPolicy />
    </>
  );
};

PrivacyPolicy.getLayout = page => <AuthLayout>{page}</AuthLayout>;
export default PrivacyPolicy;

import { AgreementContent } from '@/entities';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getBaseLayout } from '@/widgets/Layout/BaseLayout';

import { NextPageWithLayout } from '../_app';

const PrivacyPolicy: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Privacy policy'} />
      <AgreementContent privacyPolicy />
    </>
  );
};

PrivacyPolicy.getLayout = getBaseLayout;
export default PrivacyPolicy;

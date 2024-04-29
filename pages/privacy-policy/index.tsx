import { AgreementContent } from '@/entities';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

import { NextPageWithLayout } from '../_app';

const PrivacyPolicy: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Privacy policy'} />
      <AgreementContent privacyPolicy />
    </>
  );
};

PrivacyPolicy.getLayout = getLayout;
export default PrivacyPolicy;

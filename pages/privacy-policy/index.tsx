import { AgreementContent } from '@/entities';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { Layout } from '@/widgets/Layout/Layout';

import { NextPageWithLayout } from '../_app';

const PrivacyPolicy: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Privacy policy'} />
      <AgreementContent privacyPolicy />
    </>
  );
};

PrivacyPolicy.getLayout = page => <Layout>{page}</Layout>;
export default PrivacyPolicy;

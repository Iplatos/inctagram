import { useEffect } from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getCommonLayout } from '@/widgets/Layout/CommonLayout/CommonLayout';
import { useRouter } from 'next/router';

const Settings: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/settings/general-information');
  }, []);

  return (
    <>
      <HeadMeta title={'Edit'} />
    </>
  );
};

Settings.getLayout = getCommonLayout;
export default Settings;

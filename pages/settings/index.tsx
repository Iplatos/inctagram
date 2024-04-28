import { NextPageWithLayout } from '@/pages/_app';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getBaseLayout } from '@/widgets/Layout/BaseLayout';
import { EditProfile } from '@/widgets/accounts/edit/edit-profile';

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Edit'} />
      <EditProfile />
    </>
  );
};

Settings.getLayout = getBaseLayout;
export default Settings;

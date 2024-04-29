import { NextPageWithLayout } from '@/pages/_app';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getSettingsLayout } from '@/widgets/Layout/SettingsLayout';
import { EditProfile } from '@/widgets/accounts/edit/edit-profile';

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Edit'} />
      <EditProfile />
    </>
  );
};

Settings.getLayout = getSettingsLayout;
export default Settings;

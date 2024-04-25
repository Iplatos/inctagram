import { Devices } from '@/entities/accounts/edit';
import { EditProfileLayout } from '@/widgets/editProfileLayout/editProfileLayout';

import { NextPageWithLayout } from '../_app';

const DevicesPage: NextPageWithLayout = () => {
  return <Devices />;
};

DevicesPage.getLayout = page => <EditProfileLayout>{page}</EditProfileLayout>;

export default DevicesPage;

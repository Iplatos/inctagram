import { EditProfileLayout } from '@/widgets/editProfileLayout/editProfileLayout';

import { NextPageWithLayout } from '../_app';

const Devices: NextPageWithLayout = () => {
  return <div>Devices page</div>;
};

Devices.getLayout = page => <EditProfileLayout>{page}</EditProfileLayout>;

export default Devices;

import { EditProfileLayOut } from '@/widgets/editProfileLayout/editProfileLayout';

import { NextPageWithLayout } from '../_app';

const Devices: NextPageWithLayout = () => {
  return <div>devices page!!</div>;
};

Devices.getLayout = page => <EditProfileLayOut>{page}</EditProfileLayOut>;
export default Devices;

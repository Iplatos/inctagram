import { AccountManagement } from '@/entities/accounts/edit';
import { EditProfileLayout } from '@/widgets/editProfileLayout/editProfileLayout';

import { NextPageWithLayout } from '../_app';
const AccountManagementPage: NextPageWithLayout = () => {
  return <AccountManagement />;
};

AccountManagementPage.getLayout = page => <EditProfileLayout>{page}</EditProfileLayout>;

export default AccountManagementPage;

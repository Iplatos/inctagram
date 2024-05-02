import { MyPayments } from '@/entities/accounts/edit';
import { EditProfileLayout } from '@/widgets/editProfileLayout/editProfileLayout';

import { NextPageWithLayout } from '../_app';
const MyPaymentsPage: NextPageWithLayout = () => {
  return <MyPayments />;
};

MyPaymentsPage.getLayout = page => <EditProfileLayout>{page}</EditProfileLayout>;

export default MyPaymentsPage;

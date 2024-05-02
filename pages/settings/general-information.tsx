import { GeneralInformation } from '@/entities/accounts/edit';
import { EditProfileLayout } from '@/widgets/editProfileLayout/editProfileLayout';

import { NextPageWithLayout } from '../_app';

const GeneralInformationPage: NextPageWithLayout = () => {
  return <GeneralInformation />;
};

GeneralInformationPage.getLayout = page => <EditProfileLayout>{page}</EditProfileLayout>;

export default GeneralInformationPage;

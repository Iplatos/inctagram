import { NextPageWithLayout } from '@/pages/_app';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { CommonLayout } from '@/widgets/Layout/CommonLayout';
import { EditProfile } from '@/widgets/accounts/edit/edit-profile';

const Edit: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Edit'} />
      <EditProfile />
    </>
  );
};

Edit.getLayout = page => <CommonLayout>{page}</CommonLayout>;
export default Edit;

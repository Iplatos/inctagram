import { NextPageWithLayout } from '@/pages/_app';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { CommonLayout } from '@/widgets/Layout/CommonLayout';

const Edit: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Edit'} />

      <div>hello</div>
    </>
  );
};

Edit.getLayout = page => <CommonLayout>{page}</CommonLayout>;
export default Edit;

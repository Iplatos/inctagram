import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function TestPage() {
  return (
    <>
      <HeadMeta title={'test'} />
      <div>Test Page</div>
    </>
  );
}

TestPage.getLayout = getLayout;
export default TestPage;

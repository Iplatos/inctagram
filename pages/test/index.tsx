import { Skeleton } from '@/shared/ui/skeleton';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Test() {
  return (
    <>
      <HeadMeta title={'test'} />
      <div>
        <Skeleton borderRadius={200} height={200} width={200} />
        <Skeleton borderRadius={50} height={50} width={400} />
      </div>
    </>
  );
}

Test.getLayout = getLayout;
export default Test;

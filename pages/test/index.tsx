import { NextPageWithLayout } from '@/pages/_app';
import {
  CreatePostParams,
  useCreatePostMutation,
  useDeletePostMutation,
} from '@/shared/api/posts-api';
import { Button } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { Notifications } from 'features/notifications';

import IMG from './IMG.jpg';

const Test: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'test'} />
      <div>
        <Notifications />
      </div>
    </>
  );
};

Test.getLayout = getLayout;
export default Test;

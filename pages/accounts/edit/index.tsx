import React from 'react';

import { NextPageWithLayout } from '@/pages/_app';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { EditProfile } from '@/widgets/accounts/edit/edit-profile';

const Edit: NextPageWithLayout = () => (
  <>
    <HeadMeta title={'Edit Profile'} />
    <EditProfile />
  </>
);

Edit.getLayout = getLayout;
export default Edit;

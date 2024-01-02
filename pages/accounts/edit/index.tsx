import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { EditProfile } from '@/widgets/accounts/edit/edit-profile';

function Edit() {
  return (
    <>
      <HeadMeta title={'Edit'} />
      <EditProfile />
    </>
  );
}

Edit.getLayout = getLayout;
export default Edit;

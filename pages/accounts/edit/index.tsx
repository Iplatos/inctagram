import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { ProfileSettingsContent } from '@/widgets/accounts/edit';

function Edit() {
  return (
    <>
      <HeadMeta title={'Edit'} />
      <ProfileSettingsContent />
    </>
  );
}

Edit.getLayout = getLayout;
export default Edit;

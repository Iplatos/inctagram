import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getPrivateLayout } from '@/widgets/layouts';

const Messenger = () => {
  return (
    <>
      <HeadMeta title={'Messenger'} />
      <div>Messenger</div>
    </>
  );
};

Messenger.getLayout = getPrivateLayout;
export default Messenger;

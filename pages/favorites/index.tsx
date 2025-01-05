import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getPrivateLayout } from '@/widgets/layouts';

const Favorites = () => {
  return (
    <>
      <HeadMeta title={'Favorites'} />
      <div>Favorites</div>
    </>
  );
};

Favorites.getLayout = getPrivateLayout;
export default Favorites;

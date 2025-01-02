import React from 'react';

import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getPrivateLayout } from '@/widgets/layouts';

const Statistic = () => {
  return (
    <>
      <HeadMeta title={'Statistic'} />
      <div>Statistic</div>
    </>
  );
};

Statistic.getLayout = getPrivateLayout;
export default Statistic;

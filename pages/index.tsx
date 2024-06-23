import React from 'react';

import { PhotoSlider, Thumbnails } from '@/features';
import { Crop } from '@/features/photo-slider/crop/crop';
import { Popover } from '@/features/photo-slider/popover';
import { TriggerButton } from '@/features/photo-slider/trigger-button/trigger-button';
import { Zoom } from '@/features/photo-slider/zoom/zoom';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Home() {
  // const { error, isLoading } = useRefreshTokenQuery();

  // if (isLoading) {
  //   return <div style={{ marginLeft: '300px' }}>Init loading...</div>;
  // }

  // if (error && 'status' in error && error.status === 401) {
  //   return <div style={{ marginLeft: '300px' }}>Unauthorized</div>;
  // }

  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>

      <PhotoSlider />
      {/* <Zoom /> */}
      {/* <Crop /> */}
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

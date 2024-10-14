import { useState } from 'react';

import {
  PhotoSlider,
  PhotoSliderAspectRatioHandler,
  PhotoSliderCropCompleteHandler,
  PhotoSliderZoomHandler,
} from '@/features';
import { getPhotoSliderMockItems } from '@/features/photo-slider/slider.stories';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

function Home() {
  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

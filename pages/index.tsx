import { useState } from 'react';

import {
  PGWithCropAspectRatioHandler,
  PGWithCropCropCompleteHandler,
  PGWithCropZoomHandler,
  PhotoGalleryWithCrop,
} from '@/features';
import { getPGWithCropMockItems } from '@/features/photo-gallery-with-crop/photo-gallery-with-crop.stories';
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

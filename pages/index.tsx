import React, { useState } from 'react';

import { Crop } from '@/entities/photo-slider/crop/crop';
import { Popover } from '@/entities/photo-slider/popover';
import { TriggerButton } from '@/entities/photo-slider/trigger-button/trigger-button';
import { Zoom } from '@/entities/photo-slider/zoom/zoom';
import { DEPRECATED_Modal, PhotoGallery, PhotoSlider, Thumbnails } from '@/features';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { resolveImageSrcToString } from '@/shared/helpers';
import { Button } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

import MockImage from '../assets/img/mock-user-avatar.jpg';

function Home() {
  // const { error, isLoading } = useRefreshTokenQuery();

  // if (isLoading) {
  //   return <div style={{ marginLeft: '300px' }}>Init loading...</div>;
  // }

  // if (error && 'status' in error && error.status === 401) {
  //   return <div style={{ marginLeft: '300px' }}>Unauthorized</div>;
  // }
  const [open, setOpen] = useState(false);

  const [addedImages, setAddedImages] = useState<string[]>(
    new Array(5).fill(0).map(i => resolveImageSrcToString(MockImage)) as string[]
    // [MockImage].map(resolveImageSrcToString) as string[]
    // [
    //   'https://images.pexels.com/photos/25961526/pexels-photo-25961526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    // ]
  );

  return (
    <>
      <style>{`
      .modalContainer {
        width: fit-content; !important;
      }
    `}</style>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      {/* <DEPRECATED_Modal className={'modalContainer'} onClose={() => setOpen(false)} open={open}> */}
      <PhotoSlider />
      {/* <PhotoGallery images={addedImages} /> */}
      {/* </DEPRECATED_Modal> */}
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

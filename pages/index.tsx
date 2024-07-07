import React, { useState } from 'react';

import { DEPRECATED_Modal, PhotoSlider, Thumbnails } from '@/features';
import { Crop } from '@/features/photo-slider/crop/crop';
import { Popover } from '@/features/photo-slider/popover';
import { TriggerButton } from '@/features/photo-slider/trigger-button/trigger-button';
import { Zoom } from '@/features/photo-slider/zoom/zoom';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { Button } from '@/shared/ui';
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
      .modalContainer {
        width: fit-content; !important;
        /* width: 490px; */
        /* height: 503px;  */
      }
    `}</style>
      <HeadMeta title={'main'} />
      <div style={{ marginLeft: '300px' }}>Hello World!</div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <DEPRECATED_Modal className={'modalContainer'} onClose={() => setOpen(false)} open={open}>
        <PhotoSlider />
      </DEPRECATED_Modal>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

import React, { useRef, useState } from 'react';

import { Crop } from '@/entities/photo-slider/crop/crop';
import { TriggerButton } from '@/entities/photo-slider/trigger-button/trigger-button';
import { Zoom } from '@/entities/photo-slider/zoom/zoom';
import { DEPRECATED_Modal, PhotoGallery, PhotoSlider, SliderRef } from '@/features';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { resolveImageSrcToString } from '@/shared/helpers';
import { onCropDone } from '@/shared/helpers/onCropDone';
import { Button } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';

import MockImage from '../assets/img/mock-user-avatar.jpg';

type UploadedImagesType = {
  id: number;
  imageSrc: string;
  imgAfterCrop: string;
};

function Home() {
  // const { error, isLoading } = useRefreshTokenQuery();

  // if (isLoading) {
  //   return <div style={{ marginLeft: '300px' }}>Init loading...</div>;
  // }

  // if (error && 'status' in error && error.status === 401) {
  //   return <div style={{ marginLeft: '300px' }}>Unauthorized</div>;
  // }
  // const [open, setOpen] = useState(false);

  const [addedImages, setAddedImages] = useState<UploadedImagesType[]>(
    // new Array(5).fill(0).map(i => resolveImageSrcToString(MockImage)) as string[]
    [
      {
        id: 1,
        imageSrc: resolveImageSrcToString(MockImage) as string,
        imgAfterCrop: '',
      },
      {
        id: 2,
        imageSrc: resolveImageSrcToString(MockImage) as string,
        imgAfterCrop: '',
      },
    ]
  );

  const [imgAfterCrop, setImgAfterCrop] = useState<string>('');

  return (
    <>
      <style>{`
      .modalContainer {
        width: fit-content; !important;
      }
    `}</style>
      <HeadMeta title={'main'} />
      {/* <div style={{ marginLeft: '300px' }}>Hello World!</div> */}

      <PhotoSlider
        addedImages={addedImages.map(i => i.imageSrc)}
        imgAfterCrop={imgAfterCrop}
        setImgAfterCrop={setImgAfterCrop}
      />

      <PhotoGallery items={addedImages.map(i => i.imageSrc).map(i => ({ original: i }))} />
      {/* </DEPRECATED_Modal> */}
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

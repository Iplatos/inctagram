import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Popover } from '@/entities/photo-slider';
import { Crop } from '@/entities/photo-slider/crop/crop';
import { TriggerButton } from '@/entities/photo-slider/trigger-button/trigger-button';
import { Zoom } from '@/entities/photo-slider/zoom/zoom';
import {
  AddPhotoCard,
  DEPRECATED_Modal,
  FilterPhotoCard,
  PhotoGallery,
  PhotoSlider,
  SliderRef,
} from '@/features';
import { useRefreshTokenQuery } from '@/shared/api/auth-api';
import { openModal } from '@/shared/api/modal-slice';
import { resolveImageSrcToString } from '@/shared/helpers';
import { onCropDone } from '@/shared/helpers/onCropDone';
import { Button } from '@/shared/ui';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { ModalCreatePublication } from '@/widgets/modal-create-publication';
import { ModalSaveDraft } from '@/widgets/modal-save-draft/modal-save-draft';

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

  const dispatch = useDispatch();

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
      <div style={{ marginLeft: '300px' }}>Hello World!</div>
      {/* <Button onClick={() => setOpen(true)}>Open Modal</Button> */}

      {/* <DEPRECATED_Modal className={'modalContainer'} onClose={() => setOpen(false)} open={open}> */}
      {/* <PhotoSlider /> */}
      {/* <PhotoGallery images={addedImages} /> */}
      {/* </DEPRECATED_Modal> */}

      {/*  */}
      {/* <button onClick={() => dispatch(openModal(true))}>!!!!click</button> */}

      {/* <ModalCreatePublication /> */}

      {/* <FilterPhotoCard
        items={[
          {
            filter: 'normal',
            src: 'https://images.pexels.com/photos/17756265/pexels-photo-17756265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
          {
            filter: 'normal',
            src: 'https://images.pexels.com/photos/17756265/pexels-photo-17756265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        ]}
      /> */}
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

import React, { Ref, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';

import style from './thumbnails.module.scss';

import MockImg from '../../../assets/img/mock-user-avatar.jpg';
import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover';
import { TriggerButton } from '../trigger-button/trigger-button';
import { FileInput } from './fileInput';

type ThumbnailsPropsType = {
  boundary: Popover.PopperContentProps['collisionBoundary'];
};

export const Thumbnails = (props: ThumbnailsPropsType) => {
  const { boundary } = props;

  const [image, setImage] = useState('');
  // const [currentPage, setCurrentPage] = useState('choose image');

  const onImageSelected = (selectedImg: string) => {
    setImage(selectedImg);
    // setCurrentPage('crop image');
  };

  return (
    <>
      <PopoverRoot>
        <PopoverTrigger>
          <button aria-label={'Update dimensions'}>
            <TriggerButton variant={'image'} />
          </button>
        </PopoverTrigger>
        <PopoverContent collisionBoundary={boundary}>
          <Image alt={'thumbnail'} height={82} src={MockImg} width={80} />
          <Image alt={'thumbnail'} height={82} src={MockImg} width={80} />

          <FileInput onImageSelected={onImageSelected} />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};

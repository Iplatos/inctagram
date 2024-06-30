import React, { Ref, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';

import style from './thumbnails.module.scss';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover';
import { TriggerButton } from '../trigger-button/trigger-button';
import { FileInput } from './fileInput';

type ThumbnailsPropsType = {
  addedImages: string[];
  boundary: Popover.PopperContentProps['collisionBoundary'];
  image: string;
  setAddedImages: any;
  setImage: (selectedImg: string) => void;
};

export const Thumbnails = (props: ThumbnailsPropsType) => {
  const { addedImages, boundary, image, setAddedImages, setImage } = props;

  const imgArray: string[] = [];

  const onImageSelected = async (selectedImg: string) => {
    await setImage(selectedImg);
    imgArray.push(image);
    console.log(imgArray);

    // setAddedImages([...addedImages, image]);
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
          <div className={style.scrollContainer}>
            {addedImages.length > 0
              ? addedImages.map((img, index) => (
                  <Image alt={'thumbnail'} height={82} key={index} src={img} width={80} />
                ))
              : null}
          </div>

          <FileInput onImageSelected={onImageSelected} />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};

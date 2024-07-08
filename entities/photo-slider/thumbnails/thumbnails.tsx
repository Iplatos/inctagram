import React, { Dispatch, Ref, SetStateAction, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';

import style from './thumbnails.module.scss';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover-root';
import { ThumbnailImage } from '../thumbnail-image';
import { TriggerButton } from '../trigger-button/trigger-button';
import { FileInput } from './fileInput';

type SetAddedImagesCallback = (images: string[]) => string[];
type ThumbnailsPropsType = {
  addedImages: string[];
  boundary: Popover.PopperContentProps['collisionBoundary'];
  image: string;
  setAddedImages: (images: SetAddedImagesCallback | string[]) => void;
  setImage: (selectedImg: string) => void;
};

export const Thumbnails = (props: ThumbnailsPropsType) => {
  const { addedImages, boundary, setAddedImages, setImage } = props;

  const onImageSelected = async (selectedImg: string) => {
    await setImage(selectedImg);
    setAddedImages(prev => [...prev, selectedImg]);
  };

  return (
    <>
      <PopoverRoot>
        <PopoverTrigger>
          <button aria-label={'Update dimensions'}>
            <TriggerButton variant={'image'} />
          </button>
        </PopoverTrigger>
        <PopoverContent boundary={boundary}>
          <div className={style.scrollContainer}>
            {addedImages.length > 0
              ? addedImages.map((img, index) => {
                  const handleRemoveImage = () => {
                    setAddedImages(prev => prev.filter((_, i) => i !== index));
                  };

                  return <ThumbnailImage key={index} onRemoveImage={handleRemoveImage} src={img} />;
                })
              : null}
          </div>

          <FileInput disabled={addedImages.length === 10} onImageSelected={onImageSelected} />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};

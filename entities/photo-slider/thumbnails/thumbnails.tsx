import { PropsWithChildren, useState } from 'react';

import { ConfirmModal } from '@/features/confirm-modal';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Typography } from '@/shared/ui';
import { PopoverContentProps } from '@radix-ui/react-popover';

import style from './thumbnails.module.scss';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover-root';
import { ThumbnailImage } from '../thumbnail-image';
import { TriggerButton } from '../trigger-button/trigger-button';
import { FileInput } from './fileInput';

type SetAddedImagesCallback = (images: string[]) => string[];
type ThumbnailsPropsType = {
  addedImages: string[];
  image: string;

  popoverContentProps?: PropsWithChildren<PopoverContentProps>;
  setAddedImages: (images: SetAddedImagesCallback | string[]) => void;
  setImage: (selectedImg: string) => void;
};

export const Thumbnails = (props: ThumbnailsPropsType) => {
  const { addedImages, popoverContentProps, setAddedImages, setImage } = props;

  const { t } = useTranslation();

  const onImageSelected = async (selectedImg: string) => {
    await setImage(selectedImg);
    setAddedImages(prev => [...prev, selectedImg]);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setAddedImages([]);
    setOpenModal(false);
  };

  return (
    <>
      <PopoverRoot>
        <PopoverTrigger>
          <button aria-label={'Update dimensions'}>
            <TriggerButton variant={'image'} />
          </button>
        </PopoverTrigger>
        <PopoverContent {...popoverContentProps}>
          <div className={style.scrollContainer}>
            {addedImages.length > 0
              ? addedImages.map((img, index) => {
                  const handleRemoveImage = () => {
                    if (addedImages.length === 1) {
                      setOpenModal(true);

                      return;
                    }

                    setAddedImages(prev => prev.filter((_, i) => i !== index));
                  };

                  return <ThumbnailImage key={index} onRemoveImage={handleRemoveImage} src={img} />;
                })
              : null}
            <FileInput disabled={addedImages.length === 10} onImageSelected={onImageSelected} />
          </div>
        </PopoverContent>
      </PopoverRoot>

      <ConfirmModal
        cancelButtonTitle={t.editProfile.photoSlider.deletePhoto.cancelButtonTitle}
        confirmButtonTitle={t.editProfile.photoSlider.deletePhoto.confirmButtonTitle}
        headerTitle={t.editProfile.photoSlider.deletePhoto.headerTitle}
        onCancel={() => setOpenModal(false)}
        onConfirm={closeModal}
        open={openModal}
      >
        <Typography.Regular16 component={'p'}>
          {t.editProfile.photoSlider.deletePhoto.message}
        </Typography.Regular16>
      </ConfirmModal>
    </>
  );
};

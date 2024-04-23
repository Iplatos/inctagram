import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

import { InputTypeFile } from '@/features/addPhoto/InputTypeFile';
import { showErrorMessage, showPreViewAvatar } from '@/features/addPhoto/addPhoto.slice';
import { Modal } from '@/features/modal';
import { useAppDispatch, useAppSelector } from '@/shared/api/pretyped-redux-hooks';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { Button } from '@/shared/ui';
import { Alerts } from '@/shared/ui/alerts/Alerts';
import { Typography } from '@/shared/ui/typography';
import ImageSVG from 'assets/icons/image.svg';

import s from './addPhoto.module.scss';

export const AddPhoto = () => {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const dispatch = useAppDispatch();
  const { avatar, errorMessage } = useAppSelector(state => state.addPhotoReducer);

  const addPhoto = (photo: File) => {
    addPhotoWithParams(photo, pos, scale);
  };

  const addPhotoWithParams = (photo: File, pos: { x: number; y: number }, scale: number) => {
    const formData = new FormData();

    formData.append('file', photo);
    formData.append('cropProps', JSON.stringify({ pos, scale }));

    // uploadPhoto(formData as unknown as any);
  };

  function handleModalClosed() {
    setOpen(false);
    dispatch(showErrorMessage(''));
    dispatch(showPreViewAvatar(''));
  }

  function handleModalOpened() {
    setOpen(true);
  }

  const addAvatarForPreView = (photo: string) => {
    dispatch(showPreViewAvatar(photo));
  };
  const changePhotoSize = (e: React.WheelEvent<HTMLDivElement>) => {
    e.deltaY < 0 ? setScale(scale + 0.1) : setScale(scale - 0.1);
  };
  const changePos = (position: { x: number; y: number }) => {
    setPos(position);
  };

  const { addProfilePhoto: t } = useTranslation().t.generalInformation;

  return (
    <div>
      <Button onClick={handleModalOpened} variant={'tertiary'}>
        {t.submitButton}
      </Button>

      <Modal
        className={s.addPhotoCard}
        onClose={handleModalClosed}
        open={open}
        showCloseButton
        title={'Add a Profile Photo'}
      >
        <Typography.Regular16>SomeEmail</Typography.Regular16>
        <Alerts isError={errorMessage}>
          <Typography.Regular14 color={'var(--color-light-900)'}>
            {errorMessage || ''}
          </Typography.Regular14>
        </Alerts>

        <div
          className={avatar ? s.photoPlaceHolderWithAvatar : s.photoPlaceHolder}
          onWheel={e => changePhotoSize(e)}
        >
          {avatar ? (
            <AvatarEditor
              border={50}
              borderRadius={120}
              color={[255, 255, 255, 0.3]} // RGBA
              height={250}
              image={avatar}
              onPositionChange={changePos} // Update this line
              position={pos}
              scale={scale}
              width={250}
            />
          ) : (
            <ImageSVG />
          )}
        </div>
        <div style={{ display: 'flex', height: '100px', justifyContent: 'center' }}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: '96px',
              justifyContent: 'space-around',
              width: '216px',
            }}
          >
            <InputTypeFile addPhoto={addPhoto} photo={avatar} preViewAvatar={addAvatarForPreView} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

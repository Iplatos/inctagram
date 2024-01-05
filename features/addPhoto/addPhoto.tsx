import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch } from 'react-redux';

import { InputTypeFile } from '@/features/addPhoto/InputTypeFile';
import { showErrorMessage, showPreViewAvatar } from '@/features/addPhoto/addPhoto.slice';
import { Modal } from '@/features/modal';
import { useUploadPhotoMutation } from '@/shared/api/auth.service';
import { useAppSelector } from '@/shared/api/store';
import { Alerts } from '@/shared/ui/alerts/Alerts';
import { Typography } from '@/shared/ui/typography';
import { Trans } from '@/widgets/Trans/Trans';
import ImageSVG from 'assets/icons/image.svg';

import s from './addPhoto.module.scss';

// uhs47060@nezid.com pass 12Qwqw!    userId = "245a822d-796a-4bcf-9d69-6c3e246271c9"
export const AddPhoto = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('someEmail');
  const [scale, setScale] = useState<number>(1);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const [uploadPhoto] = useUploadPhotoMutation();
  const dispatch = useDispatch();
  const { avatar, errorMessage } = useAppSelector(state => state.addPhotoReducer);

  const addPhoto = (photo: File) => {
    addPhotoWithParams(photo, pos, scale);
  };
  const addPhotoWithParams = (photo: File, pos: { x: number; y: number }, scale: number) => {
    const formData = new FormData();

    /*
        formData.append('fileProps', JSON.stringify({ pos: { x: 1, y: 1 }, scale: 12 }));
    */
    formData.append('file', photo);
    formData.append('fileProps', JSON.stringify({ pos, scale }));
    formData.append('userId', '42cf740f-6e4e-4e0e-8541-873c2bd6ae7d');
    formData.append('firstName', 'Jonh');
    formData.append('familyName', 'Doe');
    formData.append('dateOfBirth', '12.12.1999');
    formData.append('aboutMe', 'about me any text');

    uploadPhoto(formData as unknown as any);
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

  return (
    <div>
      <button onClick={() => setOpen(true)} style={{ width: '200px' }}>
        add
      </button>
      <Modal
        className={s.addPhotoCard}
        onClose={handleModalClosed}
        open={open}
        showCloseButton
        title={'Add a Profile Photo'}
      >
        <Typography.Regular16>
          <Trans
            tags={{
              '1': () => <b>{`${email}`}</b>,
            }}
            text={``}
          />
        </Typography.Regular16>
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

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { InputTypeFile } from '@/features/addPhoto/InputTypeFile';
import { showErrorMessage } from '@/features/addPhoto/addPhoto.slice';
import { CloseDialog, Modal } from '@/features/modal';
import { useUploadPhotoMutation } from '@/shared/api/auth.service';
import { useAppSelector } from '@/shared/api/store';
import { Alerts } from '@/shared/ui/alerts/Alerts';
import { Typography } from '@/shared/ui/typography';
import { Trans } from '@/widgets/Trans/Trans';

import s from './addPhoto.module.scss';

// uhs47060@nezid.com pass 12Qwqw!    userId = "245a822d-796a-4bcf-9d69-6c3e246271c9"
export const AddPhoto = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('someEmail');
  const [uploadPhoto] = useUploadPhotoMutation();
  const dispatch = useDispatch();
  const addPhoto = (avatar: any) => {
    const formData = new FormData();

    formData.append('file', avatar);
    formData.append('userId', '245a822d-796a-4bcf-9d69-6c3e246271c9');
    formData.append('firstName', 'Jonh');
    formData.append('familyName', 'Doe');
    formData.append('dateOfBirth', '12.12.1999');
    formData.append('aboutMe', 'about me any text');

    uploadPhoto(formData);
  };

  const { errorMessage } = useAppSelector(state => state.addPhotoReducer);

  console.log(errorMessage);

  function handleModalClosed() {
    setOpen(false);
    dispatch(showErrorMessage(''));
  }

  function handleModalOpened() {
    setOpen(true);
  }

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
        <div className={s.photoPlaceHolder}></div>
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
            <InputTypeFile addPhoto={addPhoto} photo={'avatar'} />
            <CloseDialog asChild>
              {/*  <Button style={{ width: '219px' }} variant={'tertiary'}>
                Open Draft
              </Button>*/}
            </CloseDialog>
          </div>
        </div>
      </Modal>
    </div>
  );
};

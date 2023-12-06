import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { showErrorMessage } from '@/features/addPhoto/addPhoto.slice';
import { Button } from '@/shared/ui/Button';

type AddPhotoProps = {
  addPhoto: (a: any) => void;
  photo: string;
};

export const InputTypeFile = (props: AddPhotoProps) => {
  const dispatch = useDispatch();

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const allowedFormats = ['image/jpeg', 'image/png'];

      if (allowedFormats.includes(file.type)) {
        // Файл имеет правильный формат, продолжаем обработку
        convertFileToBase64(file, (file64: string) => {
          props.addPhoto(file);
        });

        if (file.size < 4000000) {
          convertFileToBase64(file, (file64: string) => {});
        } else {
          dispatch(showErrorMessage('Error! Photo size must be less than 10 MB!'));
        }
      } else {
        // Файл имеет неподдерживаемый формат
        dispatch(showErrorMessage('Error! The format of the uploaded photo must be PNG and JPEG.'));
      }
    }
  };

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const file64 = reader.result as string;

      callBack(file64);
    };
    reader.readAsDataURL(file);
  };
  const errorHandler = () => {
    /*dispatch(setMe({ avatar: profDefaultPicture }));*/
    console.log('error');
  };

  return (
    <div>
      <label style={{ width: '50px' }}>
        <input onChange={uploadHandler} style={{ display: 'none' }} type={'file'} />

        <Button as={'span'} style={{ width: '219px' }}>
          Select from Computer
        </Button>
      </label>
    </div>
  );
};

import React, { ChangeEvent, FC, FormEvent, useRef } from 'react';

import AddImage from 'assets/icons/plus-circle-outline.svg';

import { TriggerButton } from '../trigger-button/trigger-button';

type FileInputPropsType = {
  onImageSelected: (res: string) => void;
};

export const FileInput: FC<FileInputPropsType> = ({ onImageSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        onImageSelected(reader.result as string);
      };
    }
  };

  const onChooseImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      <input
        accept={'image/*'}
        onChange={handleOnChange}
        ref={inputRef}
        style={{ display: 'none' }}
        type={'file'}
      />

      <div onClick={onChooseImage}>
        <TriggerButton variant={'upload'} />
      </div>
    </div>
  );
};

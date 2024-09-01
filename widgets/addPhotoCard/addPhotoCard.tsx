import { ChangeEventHandler, FC, MouseEventHandler, useRef } from 'react';

import { AvatarFallback } from '@/assets/icons/avatar-fallback';
import { Button } from '@/shared/ui';

import s from './addPhotoCard.module.scss';

import { AddPhotoCardContent } from './add-photo-card-content';
import { AddPhotoCardHeader } from './add-photo-card-header';
import { AddPhotoCardRoot } from './add-photo-card-root';

export type AddPhotoCardProps = {
  disabled?: boolean;
  error: null | string;
  onClose?: () => void;
  onFileInputChange?: ChangeEventHandler<HTMLInputElement>;
  onSecondaryClick?: MouseEventHandler<HTMLButtonElement>;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  title: string;
};

export const AddPhotoCard: FC<AddPhotoCardProps> = ({
  disabled,
  error,
  onClose,
  onFileInputChange,
  onSecondaryClick,
  primaryButtonTitle = 'Primary',
  secondaryButtonTitle = 'Secondary',
  title,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <AddPhotoCardRoot>
      <AddPhotoCardHeader disabled={disabled} onClose={onClose} title={title} />

      <AddPhotoCardContent error={error}>
        <div className={s.adaptivePaddingBox}>
          <div className={s.placeholderBackground}>
            <AvatarFallback className={s.placeholderIcon} />
          </div>

          <div className={s.buttonsGroup}>
            <Button
              className={s.button}
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
            >
              {primaryButtonTitle}
              {/* TODO: Move file input to a separate file */}
            </Button>
            <input
              onChange={onFileInputChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type={'file'}
            />
            {onSecondaryClick && (
              <Button
                className={s.button}
                disabled={disabled}
                onClick={onSecondaryClick}
                variant={'tertiary'}
              >
                {secondaryButtonTitle}
              </Button>
            )}
          </div>
        </div>
      </AddPhotoCardContent>
    </AddPhotoCardRoot>
  );
};

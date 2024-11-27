import { PropsWithoutChildren } from '@/shared/types/helpers';
import { PopoverProps, PopperContentProps } from '@radix-ui/react-popover';
import clsx from 'clsx';

import style from './thumbnails.module.scss';

import { PopoverContent, PopoverRoot, PopoverTrigger } from '../popover-root';
import { ThumbnailImage } from '../thumbnail-image';
import { TriggerButton } from '../trigger-button/trigger-button';
import { FileInput } from './fileInput';

export type ThumbnailsProps = {
  onItemAdd?: (imageSrc: string) => void;

  onItemRemove?: (index: number) => void;
  onOpenChange?: PopoverProps['onOpenChange'];
  popoverContentProps?: PropsWithoutChildren<PopperContentProps>;
  thumbnails: string[];
};

export const Thumbnails = ({
  onItemAdd,
  onItemRemove,
  onOpenChange,
  popoverContentProps = {},
  thumbnails,
}: ThumbnailsProps) => {
  const { className: popoverContentClass, ...restPopoverContentProps } = popoverContentProps;

  return (
    <PopoverRoot onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <TriggerButton variant={'image'} />
      </PopoverTrigger>

      <PopoverContent
        className={clsx(style.content, popoverContentClass)}
        {...restPopoverContentProps}
      >
        <div className={style.scrollContainer}>
          {thumbnails.map((imageSrc, index) => (
            <ThumbnailImage
              key={index}
              onRemoveImage={() => onItemRemove?.(index)}
              src={imageSrc}
            />
          ))}
        </div>
        <FileInput disabled={thumbnails.length === 10} onImageSelected={onItemAdd} />
      </PopoverContent>
    </PopoverRoot>
  );
};

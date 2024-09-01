import { ElementRef, FC, forwardRef } from 'react';

import { ModalCard, ModalCardProps } from '@/shared/ui';
import clsx from 'clsx';

import s from './add-photo-card.module.scss';

export type AddPhotoCardRootProps = ModalCardProps;

export const AddPhotoCardRoot: FC<AddPhotoCardRootProps> = forwardRef<
  ElementRef<'div'>,
  AddPhotoCardRootProps
>(({ className, ...props }, ref) => (
  <ModalCard.Root className={clsx(s.root, className)} ref={ref} {...props} />
));

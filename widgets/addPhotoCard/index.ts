import { AddPhotoCardContent } from './add-photo-card-content';
import { AddPhotoCardHeader } from './add-photo-card-header';
import { AddPhotoCardRoot } from './add-photo-card-root';
import { AddPhotoCard as AddPhotoCardInner, AddPhotoCardProps } from './addPhotoCard';

export const AddPhotoCard = Object.assign(AddPhotoCardInner, {
  Content: AddPhotoCardContent,
  Header: AddPhotoCardHeader,
  Root: AddPhotoCardRoot,
});

export * from './add-photo-card-root';
export * from './add-photo-card-header';
export * from './add-photo-card-content';
export type { AddPhotoCardProps };

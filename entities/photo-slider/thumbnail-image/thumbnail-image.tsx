import { CloseIcon } from '@/assets/icons/close';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import style from './thumbnail-image.module.scss';

type ThumbnailImageProps = {
  onRemoveImage: () => void;
  src: StaticImport | string;
};

export const ThumbnailImage = (props: ThumbnailImageProps) => {
  const { onRemoveImage, src } = props;

  return (
    <div className={style.container}>
      <Image alt={'thumbnail'} height={82} src={src} width={80} />

      <IconButton className={style.button} onClick={onRemoveImage} size={'small'}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

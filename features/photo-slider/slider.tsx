import ImageGallery from 'react-image-gallery';

import { original } from '@reduxjs/toolkit';

import 'react-image-gallery/styles/scss/image-gallery.scss';

import style from './slider.module.scss';

import { LeftNav } from './leftNav/leftNav';
import { RightNav } from './rightNav/rightNav';

const images = [
  {
    // description: 'first',
    original:
      'https://images.pexels.com/photos/23169741/pexels-photo-23169741.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&dpr=2',
    originalHeight: 503,
    originalWidth: 490,
    thumbnail:
      'https://images.pexels.com/photos/22805588/pexels-photo-22805588/free-photo-of-apple.jpeg?auto=compress&cs=tinysrgb&w=160&h=70&dpr=2',
  },
  {
    // description: 'second',
    original:
      'https://images.pexels.com/photos/23623513/pexels-photo-23623513.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&dpr=2',
    originalHeight: 503,
    originalWidth: 490,
    thumbnail:
      'https://images.pexels.com/photos/23623513/pexels-photo-23623513.jpeg?auto=compress&cs=tinysrgb&w=160&h=70&dpr=2',
  },
  {
    // description: 'third',
    original:
      'https://images.pexels.com/photos/22805588/pexels-photo-22805588/free-photo-of-apple.jpeg?auto=compress&cs=tinysrgb&w=600&h=500&dpr=2',
    originalHeight: 503,
    originalWidth: 490,
    thumbnail:
      'https://images.pexels.com/photos/22805588/pexels-photo-22805588/free-photo-of-apple.jpeg?auto=compress&cs=tinysrgb&w=160&h=70&dpr=2',
  },
];

export const PhotoSlider = () => {
  return (
    <div style={{ background: 'var(--color-dark-100)', height: '500px', width: '700px' }}>
      <ImageGallery
        items={images}
        renderCustomControls={() => (
          <a
            className={'image-gallery-custom-action'}
            href={''}
            // onClick={}
          />
        )}
        renderLeftNav={(onClick, disabled) => <LeftNav disabled={disabled} onClick={onClick} />}
        renderRightNav={(onClick, disabled) => <RightNav disabled={disabled} onClick={onClick} />}
        showBullets
        showFullscreenButton={false}
        showPlayButton={false}
        thumbnailPosition={'right'}

        // showThumbnails={false}
      />
    </div>
  );
};

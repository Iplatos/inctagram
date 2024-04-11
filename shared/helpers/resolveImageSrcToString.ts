import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// NextImage 'src' prop type is 'StaticImport', which is not applicable for AvatarRadix.Image
export const resolveImageSrcToString = (src?: StaticImport | string): string | undefined => {
  const isStaticImportObject = typeof src === 'object';
  const isStaticRequire = isStaticImportObject && 'default' in src;

  if (isStaticRequire) {
    return src.default.src;
  }
  if (isStaticImportObject) {
    return src.src;
  }

  return src;
};

import { ComponentProps } from 'react';
import ContentLoader from 'react-content-loader';

type Props = {} & ComponentProps<typeof ContentLoader>;
export const PublicationSkeleton = (props: Props) => {
  return (
    <ContentLoader
      backgroundColor={'#4c4c4c'}
      foregroundColor={'#0d0d0d'}
      height={780}
      speed={2}
      viewBox={'0 0 500 780'}
      width={500}
      {...props}
    >
      <rect height={'20'} rx={'2'} ry={'2'} width={'300'} x={'0'} y={'35'} />
      <rect height={'20'} rx={'2'} ry={'2'} width={'30'} x={'470'} y={'35'} />
      <rect height={'500'} rx={'2'} ry={'2'} width={'500'} x={'0'} y={'70'} />
      <rect height={'20'} rx={'2'} ry={'2'} width={'200'} x={'0'} y={'585'} />
      <rect height={'20'} rx={'2'} ry={'2'} width={'30'} x={'470'} y={'585'} />
      <rect height={'40'} rx={'2'} ry={'2'} width={'500'} x={'0'} y={'620'} />
      <rect height={'30'} rx={'2'} ry={'2'} width={'200'} x={'0'} y={'675'} />
      <rect height={'60'} rx={'2'} ry={'2'} width={'500'} x={'0'} y={'720'} />
    </ContentLoader>
  );
};

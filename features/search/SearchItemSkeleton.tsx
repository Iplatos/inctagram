import ContentLoader from 'react-content-loader';

export const SearchItemSkeleton = () => {
  return (
    <ContentLoader
      backgroundColor={'#4c4c4c'}
      foregroundColor={'#0d0d0d'}
      height={460}
      speed={2}
      viewBox={'0 0 400 460'}
      width={400}
    >
      <circle cx={'31'} cy={'31'} r={'15'} />
      <rect height={'10'} rx={'2'} ry={'2'} width={'140'} x={'58'} y={'18'} />
      <rect height={'10'} rx={'2'} ry={'2'} width={'140'} x={'58'} y={'34'} />
    </ContentLoader>
  );
};

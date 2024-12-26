import { useEffect, useState } from 'react';

import { PublicationI } from '@/shared/api/publications/publication-api.types';
import { useGetPublicationsQuery } from '@/shared/api/publications/publications-api';
import { useInfiniteScroll } from '@/shared/hooks';
import { Typography } from '@/shared/ui';

import styles from './publications.module.scss';

import { PublicationSkeleton } from './publication.skeleton';
import { Publication } from './publication/Publication';

type Props = {};

export const Publications = (props: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [nextCursor, setNextCursor] = useState<number>(0);
  const [allPublications, setAllPublications] = useState<PublicationI[]>([]);
  const pageSize = 12;

  const { data, isFetching, isLoading } = useGetPublicationsQuery({
    pageNumber,
    pageSize,
  });

  const publications = data?.items || [];

  console.log(data?.nextCursor);

  useEffect(() => {
    if (data) {
      if (allPublications.length === 0) {
        setAllPublications(publications);
        setNextCursor(data.nextCursor);
      }
      if (nextCursor !== data.nextCursor) {
        setAllPublications(prev => [...prev, ...publications]);
      }
    }
  }, [pageNumber, data]);

  const lastPublicationRef = useInfiniteScroll(() => {
    if (!isFetching) {
      setPageNumber(prev => prev + 1);
    }
  }, isFetching);

  if (isLoading && allPublications.length === 0 && !data) {
    return (
      <div className={styles.container}>
        <PublicationSkeleton />
      </div>
    );
  }

  if (publications.length === 0) {
    return (
      <div className={styles.container}>
        <Typography.H2>No publications</Typography.H2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {allPublications.map((publication, index) => {
        const isLast = index === allPublications.length - 1 && pageNumber === data?.pagesCount;

        return (
          <Publication
            key={publication.id}
            publication={publication}
            ref={isLast ? lastPublicationRef : undefined}
          />
        );
      })}
    </div>
  );
};

import React, { useState } from 'react';

import { Typography } from '@/shared/ui';
import { usePublications } from '@/widgets/publications/usePublications';

import styles from './publications.module.scss';

import { PublicationSkeleton } from './publication.skeleton';
import { Publication } from './publication/Publication';

export const Publications = () => {
  const [page, setPage] = useState(1);
  const { isLoading, lastPublicationRef, publications } = usePublications({
    page,
    pageSize: 12,
    setPage,
  });

  const isInitialLoading = isLoading && publications.length === 0;
  const isLast = (index: number) => publications.length === index + 1 && !isLoading;

  if (isInitialLoading) {
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
      {publications.map((publication, index) => {
        return (
          <Publication
            key={publication.id}
            publicationId={publication.id}
            ref={isLast(index) ? lastPublicationRef : undefined}
          />
        );
      })}
    </div>
  );
};

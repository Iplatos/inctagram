import { useEffect, useState } from 'react';

import { PublicationI } from '@/shared/api/publications/publication-api.types';
import { useGetPublicationsQuery } from '@/shared/api/publications/publications-api';
import { useInfiniteScroll } from '@/shared/hooks';

type Props = {
  page: number;
  pageSize: number;
  setPage: (page: (prev: number) => any) => void;
};

export const usePublications = (props: Props) => {
  const { page, pageSize, setPage } = props;
  const [publications, setPublications] = useState<PublicationI[]>([]);
  const [nextPage, setNextPage] = useState(0);
  const { data, isFetching, isLoading } = useGetPublicationsQuery({
    endCursorPostId: nextPage,
    pageNumber: page,
    pageSize,
  });

  useEffect(() => {
    if (data?.nextCursor !== nextPage && data) {
      setPublications(prev => {
        const newItems = data.items.filter(
          newItem => !prev.some(prevItem => prevItem.id === newItem.id)
        );

        return [...prev, ...newItems];
      });
    }
  }, [data?.items, page]);

  const hasNextPage = data && page < data?.pagesCount;
  const lastPublicationRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetching) {
      setNextPage(data?.nextCursor);
      setPage(prev => prev + 1);
    }
  }, isFetching);

  return { hasNextPage, isLoading, lastPublicationRef, publications };
};

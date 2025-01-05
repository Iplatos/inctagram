'use client';

import { SearchForm } from '@/features/search/SearchForm';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getPrivateLayout } from '@/widgets/layouts';

function Search() {
  return (
    <>
      <HeadMeta title={'Search'} />
      <SearchForm />
    </>
  );
}

Search.getLayout = getPrivateLayout;
export default Search;

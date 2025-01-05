import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { SearchList } from '@/features/search/SearchList';
import { TextField, Typography } from '@/shared/ui';

import s from './search-form.module.scss';

export const SearchForm = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      searchParams: '',
    },
  });

  const searchParams = watch('searchParams');
  const onChangeHandler = (data: { searchParams: string }) => {
    console.log('Search Params:', data.searchParams);
  };

  return (
    <div>
      <Typography.H1>Search</Typography.H1>
      <form onChange={handleSubmit(onChangeHandler)}>
        <Controller
          control={control}
          name={'searchParams'}
          render={({ field }) => (
            <TextField {...field} className={s.input} inputType={'search'} placeholder={'Search'} />
          )}
        />
      </form>
      {searchParams && <SearchList searchParams={searchParams} />}
    </div>
  );
};

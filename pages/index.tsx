import React, { useState } from 'react';

import { ProfileForm } from '@/features/accounts/edit';
import { useGetMeQuery } from '@/shared/api/auth.service';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { useRouter } from 'next/navigation';
import { EditProfile } from '@/widgets/accounts';
import { Combobox } from '@/shared/ui/combobox';

function Home() {
  const { t } = useTranslation();
  const { data: meData, error: meError, isLoading: isMeLoading } = useGetMeQuery();
  const router = useRouter();

  console.log(meData);
  if (meError) {
    if ('status' in meError) {
      meError.status === 401 && router.push('/signIn');
    }
  }
  if (isMeLoading) {
    return <div>hello</div>;
  }

  return (
    <>
      <HeadMeta title={'main'} />
      {/* <div style={{ visibility: 'hidden' }}>adf</div> */}

      {/*

      */}
      <div style={{ marginLeft: '220px' }}>
        {/* <AddPhoto /> */}
        {/* <DatePickerContainer /> */}

        <EditProfile />
        {/* <Combobox
          label="select country"
          options={options}
          value={value}
          onChange={setValue}
          inputValue={inputValue}
          onInputChange={setInputValue}
          placeholder={'Country'}
        /> */}
      </div>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

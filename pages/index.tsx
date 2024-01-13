import React, { useState } from 'react';

import { DatePickerContainer } from '@/components/datePicker/datePickerContainer';
import { AddPhoto } from '@/features/addPhoto/addPhoto';
import { useGetMeQuery } from '@/shared/api/auth.service';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { useRouter } from 'next/navigation';
import { EditProfile } from '@/widgets/accounts';
import { Combobox } from '@/shared/ui/combobox';

function Home() {
  const { t } = useTranslation();
  /*const { data: feed, error } = useGetFeedQuery();*/
  const { data: meData, error: meError, isLoading: isMeLoading } = useGetMeQuery();
  /*const { data, error } = useFilteredPostsQuery();*/
  const router = useRouter();

  // console.log(meData);
  // /*const { getMe } = useGetMeQuery();*/
  // if (meError) {
  //   if ('status' in meError) {
  //     meError.status === 401 && router.push('/signIn');
  //   }
  // }
  // if (isMeLoading) {
  //   return <div>hello</div>;
  // }

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const options = [
    {
      value: 'apple',
      label: 'Apple',
    },
    {
      value: 'banana',
      label: 'Banana',
    },
    {
      value: 'blueberry',
      label: 'Blueberry',
    },
    {
      value: 'grapes',
      label: 'Grapes',
    },
    {
      value: 'pineapple',
      label: 'Pineapple',
    },
    {
      value: 'cherry',
      label: 'Cherry',
    },
    {
      value: 'grapefruit',
      label: 'Grapefruit',
    },
    {
      value: 'lemon',
      label: 'Lemon',
    },
    {
      value: 'mango',
      label: 'Mango',
    },
  ];

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
      {/*  <div>
        {error?.status} {JSON.stringify(error)}
      </div>*/}
      {/*<button onClick={logOut}>logout</button>*/}

      {/* <Sidebar />
      <ProfileSettingsContent /> */}
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

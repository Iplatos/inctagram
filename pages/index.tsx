import { useState } from 'react';
import DatePicker from 'react-multi-date-picker';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { useGetFeedQuery } from '@/pages/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useRouter } from 'next/navigation';
import InputIcon from 'react-multi-date-picker/components/input_icon';

import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from './../components/datePicker/datePicker.module.css';

function Home() {
  const { t } = useTranslation();
  const { data: feed, error } = useGetFeedQuery();
  /*const { data, error } = useFilteredPostsQuery();*/
  const router = useRouter();
  /*const { getMe } = useGetMeQuery();*/
  const [value, setValue] = useState(new Date());
  //   console.log('router.locales: ', router.locales);
  //   console.log('router.locale: ', router.locale);
  //   console.log('router.defaultLocale: ', router.defaultLocale);

  if (error) {
    if ('status' in error) {
      error.status === 401 && router.push('/signIn');
    }
  }

  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ visibility: 'hidden' }}>adf</div>

      <DatePicker
        className={'bg-dark'}
        containerClassName={s.cont}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        inputClass={s.customInput}
        onChange={setValue}
        render={<InputIcon />}
        value={value}
      />
      {/*  <div>
        {error?.status} {JSON.stringify(error)}
      </div>*/}
      {/*<button onClick={logOut}>logout</button>*/}
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

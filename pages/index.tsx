import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import {
  setTokenToLocalStorage,
  useFilteredPostsQuery,
  useGetFeedQuery,
} from '@/pages/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { useRouter } from 'next/navigation';

function Home() {
  const { t } = useTranslation();
  const { data: feed } = useGetFeedQuery();
  const { data, error } = useFilteredPostsQuery();
  const router = useRouter();
  /*const { getMe } = useGetMeQuery();*/

  //   console.log('router.locales: ', router.locales);
  //   console.log('router.locale: ', router.locale);
  //   console.log('router.defaultLocale: ', router.defaultLocale);

  const logOut = () => {
    setTokenToLocalStorage(null);
  };

  /*  if (error) {
      if ('status' in error) {
        error.status === 401 && router.push('/signIn');
      }
    }*/

  return (
    <>
      <HeadMeta title={'main'} />
      <div>adf</div>
      {/*  <div>
        {error?.status} {JSON.stringify(error)}
      </div>*/}
      <button onClick={logOut}>logout</button>
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

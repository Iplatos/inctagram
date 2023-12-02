import { useGetFeedQuery } from '@/pages/api/base-api';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { useRouter } from 'next/navigation';

function Home() {
  const { t } = useTranslation();
  const { data: feed, error } = useGetFeedQuery();
  /*const { data, error } = useFilteredPostsQuery();*/
  const router = useRouter();
  /*const { getMe } = useGetMeQuery();*/

  if (error) {
    if ('status' in error) {
      error.status === 401 && router.push('/signIn');
    }
  }

  return (
    <>
      <HeadMeta title={'main'} />
      <div style={{ visibility: 'hidden' }}>adf</div>
      {/*  <div>
        {error?.status} {JSON.stringify(error)}
      </div>*/}
      {/*<button onClick={logOut}>logout</button>*/}
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

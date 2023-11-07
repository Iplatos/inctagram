import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { useTranslation } from '@/shared/hooks/useTranslation';

function Home() {
  const { t } = useTranslation();

  //   console.log('router.locales: ', router.locales);
  //   console.log('router.locale: ', router.locale);
  //   console.log('router.defaultLocale: ', router.defaultLocale);

  return (
    <>
      <HeadMeta title={'main'} />
    </>
  );
}

Home.getLayout = getLayout;
export default Home;

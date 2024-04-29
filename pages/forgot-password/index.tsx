import { HeadMeta } from '@/widgets/HeadMeta/HeadMeta';
import { getLayout } from '@/widgets/Layout/Layout';
import { ForgotPasswordForm } from '@/widgets/auth';

import { NextPageWithLayout } from '../_app';

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />

      <ForgotPasswordForm />
    </>
  );
};

//          //"8c9252c9-bff2-49e1-8027-38883b2d5cc5", -INCTAGRAM_TRAINEE_FRONT_TOKEN_HEROKU , incubator-icta-trainee
//INCTAGRAM_TRAINEE_FRONT_TOKEN
ForgotPassword.getLayout = getLayout;
export default ForgotPassword;

/*

.dockerignore
# flyctl launch added from .gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

  # dependencies
node_modules
  .pnp
**\.pnp.js
**\.idea
  .idea
# testing
coverage

# next.js
  .next
out

# production
build

# misc
**\.DS_Store
**\*.pem

# debug
**\npm-debug.log*
**\yarn-debug.log*
**\yarn-error.log*

# local env files
**\.env*.local

# vercel
**\.vercel

# typescript
**\*.tsbuildinfo
**\next-env.d.ts

# flyctl launch added from .idea\.gitignore
# Default ignored files
  .idea\shelf
  .idea\workspace.xml
# Editor-based HTTP Client requests
  .idea\httpRequests

  */

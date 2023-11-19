import React from 'react';

import { HeadMeta } from '@/components/HeadMeta/HeadMeta';
import { getLayout } from '@/components/Layout/Layout';
import { ForgotPasswordForm } from '@/components/auth';

function ForgotPassword() {
  return (
    <>
      <HeadMeta title={'Forgot Password?'} />

      <ForgotPasswordForm />
      {/*
      <ForgotPasswordForm />
*/}
    </>
  );
}

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

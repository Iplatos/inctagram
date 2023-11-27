import { LocaleType } from './ru';

export const en: LocaleType = {
  auth: {
    createNewPasswordPage: {
      message: 'Your password must be between 6 and 20 characters',
      textLink: 'Create new password',
      title: 'Create New Password',
    },
    emailConfirmedPage: {
      text: 'Your email has been confirmed',
      textButton: 'Sign In',
      title: 'Congratulations!',
    },
    forgotPasswordPage: {
      backToSignIn: 'Back to Sign In',
      message: 'Enter your email address and we will send you further instructions',
      messageModal: 'We have sent a link to confirm your email to <1>text</1>',
      sendLink: 'Send Link',
      title: 'Forgot Password',
      titleModal: 'Email Sent',
    },
    linkExpiredPage: {
      text: 'Looks like the verification link has expired. Not to worry, we can send the link again',
      textButton: 'Resend verification link',
      title: 'Email verification link expired',
    },
    signInPage: {
      dontHaveAcc: "Don't have an account?",
      email: 'email',
      invalidEmail: 'Invalid email',
      invalidPass: 'Invalid Password',
      password: 'password',
    },
    signUpPage: {
      account: 'Do you have an account?',
      agreement: 'I agree to the <1>text</1> and <2>text</2>',
      labelEmail: 'Email',
      labelName: 'Username',
      labelPassword: 'Password',
      labelСonfirm: 'Password confirmation',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      title: 'Sign Up',
    },
  },

  navbar: {
    forgotPassword: 'Forgot Password',
    main: 'Main',
    privacyPolicy: 'Privacy Policy',
    signIn: 'Log In',
    signUp: 'Sign Up',
    termsOfService: 'Terms Of Service',
  },

  notificationMenu: {
    ago: 'ago',
    new: 'New',
    newNotification: 'New notification!',
    notifications: 'Notifications',
  },
};

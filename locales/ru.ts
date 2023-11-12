import { CreateNewPasswordForm } from '@/components/auth';
export const ru = {
  auth: {
    createNewPasswordPage: {
      message: 'Ваш пароль должен содержать от 6 до 20 символов',
      textLink: 'Создать новый пароль',
      title: 'Создать новый пароль',
    },
    forgotPasswordPage: {
      backToSignIn: 'Вернуться на страницу входа',
      message: 'Напишите адрес электронной почты и мы отправим ссылку для восстановления пароля',
      messageModal: 'Мы отправили ссылку для подтверждения пароля на почту <1>text</1>',
      sendLink: 'Отправить ссылку',
      title: 'Забыл пароль',
      titleModal: 'Ссылка отправлена',
    },
    signUpPage: {
      agreement: 'Я согласен с <1>text</1> и <2>text</2>',
    },
  },

  navbar: {
    forgotPassword: 'Забыл пароль',
    main: 'Главная страница',
    privacyPolicy: 'Политика конфиденциальности',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    termsOfService: 'Условия пользования',
  },

  notificationMenu: {
    ago: 'назад',
    new: 'Новое',
    newNotification: 'Новое уведомление!',
    notifications: 'Уведомления',
  },
};

export type LocaleType = typeof ru;

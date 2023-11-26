export const ru = {
  auth: {
    createNewPasswordPage: {
      message: 'Ваш пароль должен содержать от 6 до 20 символов',
      textLink: 'Создать новый пароль',
      title: 'Создать новый пароль',
    },
    emailConfirmedPage: {
      text: 'Ваша почта подтверждена',
      textButton: 'Войти',
      title: 'Поздравляем!',
    },
    forgotPasswordPage: {
      backToSignIn: 'Вернуться на страницу входа',
      message: 'Напишите адрес электронной почты и мы отправим ссылку для восстановления пароля',
      messageModal: 'Мы отправили ссылку для подтверждения пароля на почту <1>text</1>',
      sendLink: 'Отправить ссылку',
      title: 'Забыл пароль',
      titleModal: 'Ссылка отправлена',
    },
    linkExpiredPage: {
      text: 'Похоже, срок действия ссылки для подтверждения истек. Не волнуйтесь, мы можем отправить ссылку еще раз.',
      textButton: 'Отправить еще раз',
      title: 'Срок действия ссылки истек',
    },
    signInPage: {
      dontHaveAcc: 'Нет учётной записи?',
      invalidPass: 'Неверный формат пароля',
    },
    signUpPage: {
      account: 'У Вас есть аккаунт?',
      agreement: 'Я согласен с <1>text</1> и <2>text</2>',
      labelEmail: 'Почта',
      labelName: 'Имя пользователя',
      labelPassword: 'Пароль',
      labelСonfirm: 'Подтверждение пароля',
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
      title: 'Регистрация',
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

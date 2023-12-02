export type Notification = {
  id: string;
  isNew?: boolean;
  message: string;
  notificationTime: string;
};

export const mockedNotifications: Notification[] = [
  {
    id: '0',
    isNew: true,
    message: 'Следующий платеж у вас спишется через 1 день',
    notificationTime: '1 час',
  },
  {
    id: '1',
    isNew: true,
    message: 'Ваша подписка истекает через 7 дней',
    notificationTime: '1 день',
  },
  {
    id: '2',
    isNew: true,
    message: 'Ваша подписка истекает через 7 дней',
    notificationTime: '1 день',
  },
  {
    id: '3',
    message: 'Ваша подписка истекает через 7 дней',
    notificationTime: '1 день',
  },
  {
    id: '4',
    message: 'Ваша подписка истекает через 7 дней',
    notificationTime: '1 день',
  },
];

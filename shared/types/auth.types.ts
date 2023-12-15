export type MeResponseType = {
  createdAt: string;
  email: string;
  emailConfirmed: boolean;
  id: string;
  updatedAt: string;
  userProfile: {
    aboutMe: string;
    dateOfBirth: string;
    familyName: string;
    firstName: string;
    photos: [
      {
        authorId: string;
        createdAt: string;
        id: string;
        title: string;
        updatedAt: string;
        url: string;
      },
    ];
    userId: string;
  };
  username: string;
};
export type ChangePasswordRequestType = {
  code: string;
  password: string;
  userId: string;
};
export type ConfirmCodeRequestType = {
  code: string;
  userId: string;
};
export type PasswordRecoveryRequestType = {
  email: string;
};
export type LoginRequestType = {
  email: string;
  password: string;
};
export type LoginResponseType = {
  accessToken: string;
  refreshToken: string;
};
export type SignUpResponseType = {};
export type SignUpRequestType = {
  email: string;
  password: string;
  username: string;
};
export type UploadPhotoResponseType = {
  aboutMe: string;
  dateOfBirth: string;
  familyName: string;
  firstName: string;
  photos: [
    {
      authorId: string;
      createdAt: string;
      id: string;
      title: string;
      updatedAt: string;
      url: string;
    },
  ];
  userId: string;
};

export type AppResponse<T = {}> = {
  data: T;
  errors: string[];
  resultCode: number;
};

export type SignUpResponse = AppResponse<AppResponse<{ id: string }>>;

export type LoginRequestData = {
  email: string;
  password: string;
};

export type LoginResponse = AppResponse<{ accessToken: string }>;

export type LogoutResponse = AppResponse<true>;

export type RefreshTokenResponse = AppResponse<{ accessToken: string }>;

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

export type SignUpRequestData = {
  email: string;
  password: string;
  username: string;
};

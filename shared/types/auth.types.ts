export type AppResponse<T = {}> = {
  data: T;
  errors: string[];
  resultCode: number;
};

type Message = {
  field: string;
  message: string;
};

type AuthResponseType = { error: string; messages: Message[]; statusCode: number };

export type SignUpResponse = AuthResponseType;
//AppResponse<AppResponse<{ id: string }>>;

export type LoginRequestData = {
  email: string;
  password: string;
};

export type LoginResponse = { accessToken: string };

export type LoginIncorrectInputResponse = AuthResponseType;

export type LogoutResponse = AppResponse<true>;

export type RefreshTokenResponse = { accessToken: string };

export type ChangePasswordRequestType = {
  code: string;
  password: string;
  userId: string;
};
export type ConfirmCodeRequestData = { confirmationCode: string };

export type ResendConfirmationCodeRequest = { baseUrl: string; email: string };

export type ResendConfirmationCodeResponse = AuthResponseType;

export type ConfirmCodeResponse = AuthResponseType;

export type PasswordRecoveryRequestType = {
  baseUrl: string;
  email: string;
  recaptcha: string;
};

export type SignUpRequestData = {
  baseUrl: string;
  email: string;
  password: string;
  userName: string;
};

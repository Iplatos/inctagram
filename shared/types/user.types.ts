import { AppResponse } from './auth.types';

export type MeResponse = AppResponse<UserProfile>;

export type UserProfile = {
  aboutMe: null | string;
  avatar: AvatarResponse | null;
  createdAt: string;
  dateOfBirth: null | string;
  email: string;
  firstname: null | string;
  id: string;
  lastname: null | string;
  updatedAt: null | string;
  username: string;
};

export type UpdateMeRequestData = Record<
  Extract<'aboutMe' | 'dateOfBirth' | 'firstname' | 'lastname' | 'username', keyof UserProfile>,
  string
>;

// TODO: check for `null` value in the response body
export type UpdateMeResponse = AppResponse<null | true>;

export type SetAvatarResponse = AppResponse<{ id: string }>;

type AvatarResponse = {
  createdAt: string;
  id: string;
  offsetX: number;
  offsetY: number;
  scale: number;
  updatedAt: null | string;
  url: string;
};

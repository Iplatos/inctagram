import { AppResponse } from './auth.types';

export type GetMeResponse = {
  email: string;
  isBlocked: boolean;
  userId: number;
  userName: string;
}; //AppResponse<UserProfile>;

export type UserProfile = {
  aboutMe: null | string;
  avatar: AvatarResponse | null;
  city: null | string;
  country: null | string;
  createdAt: string;
  dateOfBirth: null | string;
  email: string;
  firstName: null | string;
  id: string;
  lastName: null | string;
  updatedAt: null | string;
  userName: string;
};

export type GetUserProfileResponse = {
  aboutMe: string;
  avatars: [
    {
      createdAt: string;
      fileSize: number;
      height: number;
      url: string;
      width: number;
    },
  ];
  city: string;
  country: string;
  dateOfBirth: string;
  firstName: string;
  followersCount: number;
  followingCount: number;
  id: number;
  isFollowedBy: boolean;
  isFollowing: boolean;
  lastName: string;
  publicationsCount: number;
  region: string;
  userName: string;
};

export type UpdateMeRequestData = Record<
  Extract<
    'aboutMe' | 'city' | 'country' | 'firstName' | 'lastName' | 'userName',
    keyof UserProfile
  >,
  string
> & { dateOfBirth?: string };

// TODO: check for `null` value in the response body
export type UpdateMeResponse = {
  error: string;
  messages: [
    {
      field: string;
      message: string;
    },
  ];
  statusCode: number;
}; //AppResponse<null | true>;

export type SetMyAvatarResponse = AppResponse<{ id: string }>;

export type DeleteMyAvatarResponse = AppResponse<null | true>;

type AvatarResponse = {
  createdAt: string;
  id: string;
  offsetX: number;
  offsetY: number;
  scale: number;
  updatedAt: null | string;
  url: string;
};

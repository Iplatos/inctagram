export interface GetUsersResponse {
  items: User[];
  nextCursor: number;
  page: number;
  pageSize: number;
  pagesCount: number;
  prevCursor: number;
  totalCount: number;
}

export interface User {
  avatars: Avatar[];
  createdAt: string;
  firstName: string;
  id: number;
  lastName: string;
  userName: string;
}

export interface Avatar {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
}

export interface GetUsersParams {
  cursor?: number;
  pageNumber?: number;
  pageSize?: number;
  search: string;
}

export interface GetUserResponse {
  aboutMe: string;
  avatars: Avatar[];
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
}

export interface GetUserParams {
  userName: string;
}

export interface GetUserFollowersResponse {
  items: Item[];
  nextCursor: number;
  page: number;
  pageSize: number;
  pagesCount: number;
  prevCursor: number;
  totalCount: number;
}

export interface Item {
  avatars: Avatar[];
  createdAt: string;
  id: number;
  isFollowedBy: boolean;
  isFollowing: boolean;
  userId: number;
  userName: string;
}

export interface GetUserFollowersParams {
  cursor?: number;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  userName: string;
}

export interface GetUserFollowingResponse extends GetUserFollowersResponse {}
export interface GetUserFollowingParams extends GetUserFollowersParams {}

export interface RemoveFollowerResponse {}
export interface RemoveFollowerParams {
  userId: number;
}
export interface AddFollowerResponse {}
export interface AddFollowerParams {
  selectedUserId: number;
}

export type PostByIdRequest = string | string[] | undefined;

export type PublicPostByIdResponse = {
  avatarOwner: string;
  createdAt: string;
  description: string;
  id: number;
  images: ImageType[];
  isLiked: boolean;
  likesCount: number;
  location: null | string;
  owner: Owner;
  ownerId: number;
  updatedAt: string;
  userName: string;
};

type ImageType = {
  createdAt: string;
  fileSize: number;
  height: number;
  uploadId: string;
  url: string;
  width: number;
};

type Owner = {
  firstName: string;
  lastName: string;
};

export type GetPublicPostsRequest = {
  endCursorPostId?: number;
  pageSize?: number;
  sortBy?: number;
  sortDirection?: number;
};

export type Post = {
  avatarOwner: string;
  createdAt: string;
  description: string;
  id: number;
  images: PostImage[];
  isLiked: boolean;

  likesCount: number;
  location: null | string;
  owner: { firstName: string; lastName: string };
  ownerId: number;
  updatedAt: string;
  userName: string;
};

export type PostImage = {
  createdAt: string;
  fileSize: number;
  height: number;
  uploadId: string;
  url: string;
  width: number;
};

export type PublicPostsResponse = {
  items: Post[];
  pageSize: number;
  totalCount: number;
  totalUsers: number;
};

export type PublicUsersResponse = {
  totalCount: number;
};

export type PublicPostsByUserIdResponse = {
  items: [
    {
      avatarOwner: string;
      createdAt: string;
      description: string;
      id: number;
      images: [
        {
          createdAt: string;
          fileSize: number;
          height: number;
          uploadId: string;
          url: string;
          width: number;
        },
      ];
      isLiked: boolean;
      likesCount: number;
      location: string;
      owner: {
        firstName: string;
        lastName: string;
      };
      ownerId: number;
      updatedAt: string;
      userName: string;
    },
  ];
  pageSize: number;
  totalCount: number;
  totalUsers: number;
};

export type PublicProfileByIdResponse = {
  aboutMe: null | string;
  avatars: [
    {
      createdAt: string;
      fileSize: number;
      height: number;
      url: string;
      width: number;
    },
  ];
  id: number;
  userName: string;
};

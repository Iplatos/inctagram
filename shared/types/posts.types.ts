export type Post = {
  cursor: number;
  id: string;
  photo: {
    aspectRatio: string;
    offsetX: number | number[];
    offsetY: number | number[];
    scale: number | number[];
    url: string;
  };
};

export type PostsResponseType = {
  items: Post[];
  size: number;
};

export type getPostsRequestData = {
  cursor: number;
  size: number;
  userId: string;
};

export type PostByIdRequest = {
  id: string;
};

export type PublicPostType = {
  createdAt: string;
  description: string;
  id: string;
  photos: [
    {
      aspectRatio: string;
      offsetX: number | number[];
      offsetY: number | number[];
      scale: number | number[];
      url: string;
    },
  ];
  user: {
    avatar: {
      createdAt: string;
      id: string;
      offsetX: number | number[];
      offsetY: number | number[];
      scale: number | number[];
      updatedAt: string;
      url: string;
    };
    id: string;
    username: string;
  };
};

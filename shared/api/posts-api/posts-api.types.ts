export interface PaginationAndSortParams {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  page?: number;
  pageSize: number;
  pagesCount?: number;
  totalCount: number;
}

export interface Image {
  createdAt: string;
  fileSize: number;
  height: number;
  uploadId: string;
  url: string;
  width: number;
}

export interface Owner {
  firstName?: string;
  lastName?: string;
}

export interface UserReference {
  avatars: Avatar[];
  id: number;
  username: string;
}

export interface CreatePostParams {
  description: string;
  files: File[];
}

export interface CreatePostImageResponse {
  images: Image[];
}

export interface CreatePostResponse extends Post {}

export interface Post {
  createdAt: string;
  description: string;
  id: number;
  images: Image[];
  isLiked: boolean;
  likesCount: number;
  location?: null | string;
  owner: Owner;
  ownerId: number;
  updatedAt: string;
  userName: string;
}

export interface DeletePostParams {
  postId: number;
  uploadIds: string[];
}

export interface GetPostParams extends PaginationAndSortParams {
  userName: string;
}

export interface GetPostResponse extends PaginatedResponse<Post> {}

export interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  from: UserReference;
  id: number;
  isLiked: boolean;
  likeCount: number;
}

export interface GetCommentsParams extends PaginationAndSortParams {
  postId: number;
}

export interface GetCommentsResponse extends PaginatedResponse<Comment> {}

export interface Answer extends Comment {}

export interface GetAnswersParams extends PaginationAndSortParams {
  commentId: number;
  postId: number;
}

export interface GetAnswerResponse extends PaginatedResponse<Answer> {}

export interface Like {
  avatars: Avatar[];
  createdAt: string;
  id: number;
  isFollowedBy: boolean;
  isFollowing: boolean;
  userId: number;
  userName: string;
}

export interface GetAnswerLikesParams extends PaginationAndSortParams {
  answerId: number;
  commentId: number;
  postId: number;
}

export interface GetCommentLikesParams extends PaginationAndSortParams {
  commentId: number;
  postId: number;
}

export interface GetLikesResponse extends PaginatedResponse<Like> {}

export interface GetPostLikesParams extends PaginationAndSortParams {
  postId: number;
}

export interface Avatar {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
}

export interface UpdatePostParams {
  description: string;
  postId: number;
}

export interface UpdateLikeStatusPostParams {
  postId: number;
}

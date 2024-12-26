export interface CreateCommentRequestParams {
  comment: string;
  postId: number;
}

export interface CreateCommentResponseParams {
  answerCount: number;
  content: string;
  createdAt: string;
  from: From;
  id: number;
  isLiked: boolean;
  likeCount: number;
  postId: number;
}

export interface From {
  avatars: Avatar[];
  id: number;
  username: string;
}

export interface Avatar {
  createdAt: string;
  fileSize: number;
  height: number;
  url: string;
  width: number;
}

export type GetPublicationsParams = {
  endCursorPostId?: number;
  pageNumber: number;
  pageSize?: number;
  previousItems?: PublicationI[];
};

export interface GetPublicationsResponse {
  items: PublicationI[];
  nextCursor: number;
  page: number;
  pageSize: number;
  pagesCount: number;
  prevCursor: number;
  totalCount: number;
}

export interface PublicationI {
  avatarOwner: string;
  avatarWhoLikes: string[];
  createdAt: string;
  description: string;
  id: number;
  images: Image[];
  isLiked: boolean;
  likesCount: number;
  location: string;
  owner: Owner;
  ownerId: number;
  updatedAt: string;
  userName: string;
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
  firstName: string;
  lastName: string;
}

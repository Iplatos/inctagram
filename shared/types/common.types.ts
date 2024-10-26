export type PublicAPIResponse<T> = {
  data: T;
  endpointName: 'getPublicPosts';
  fulfilledTimeStamp: number;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;

  originalArgs?: string;
  requestId: string;
  startedTimeStamp: number;

  status: string;
};

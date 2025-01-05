import { baseApi } from './base-api';

type getCurrentSubscriptionResponse = {
  data: [
    {
      autoRenewal: boolean;
      dateOfPayment: string;
      endDateOfSubscription: string;
      subscriptionId: string;
      userId: number;
    },
  ];
  hasAutoRenewal: boolean;
};

export type createSubscriptionRequest = {
  amount: number;
  baseUrl: string;
  paymentType: 'PAYPAL' | 'STRIPE';
  typeSubscription: 'DAY' | 'MONTHLY' | 'WEEKLY';
};

export type myPayment = {
  dateOfPayment: string;
  endDateOfSubscription: string;
  paymentType: 'PAYPAL' | 'STRIPE';
  price: number;
  subscriptionId: string;
  subscriptionType: 'DAY' | 'MONTHLY' | 'WEEKLY';
  userId: number;
};

export type getMyPaymentsResponse = myPayment[];

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    cancelAutoRenewal: builder.mutation<any, void>({
      invalidatesTags: ['Subscription'],
      query: arg => ({
        body: arg,
        method: 'POST',
        url: '/api/v1/subscriptions/canceled-auto-renewal',
      }),
    }),
    createSubscription: builder.mutation<any, createSubscriptionRequest>({
      invalidatesTags: ['Subscription'],
      query: arg => ({
        body: arg,
        method: 'POST',
        url: '/api/v1/subscriptions',
      }),
    }),
    getCostOfSubscriptions: builder.query<any, void>({
      providesTags: ['Subscription-Cost'],
      query: () => ({
        url: '/api/v1/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
    getCurrentSubscription: builder.query<getCurrentSubscriptionResponse, void>({
      providesTags: ['Subscription'],
      query: () => ({
        url: '/api/v1/subscriptions/current-payment-subscriptions',
      }),
    }),
    getMyPayments: builder.query<getMyPaymentsResponse, void>({
      providesTags: ['Payments'],
      query: () => ({
        url: '/api/v1/subscriptions/my-payments',
      }),
    }),
  }),
});

export const {
  useCancelAutoRenewalMutation,
  useCreateSubscriptionMutation,
  useGetCostOfSubscriptionsQuery,
  useGetCurrentSubscriptionQuery,
  useGetMyPaymentsQuery,
} = subscriptionsApi;

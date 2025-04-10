import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getCount: builder.query<number, void>({
      query: () => 'count',
    }),
    updateCount: builder.mutation<number, number>({
      query: (amount) => ({
        url: 'count',
        method: 'POST',
        body: { amount },
      }),
    }),
  }),
});

export const { useGetCountQuery, useUpdateCountMutation } = counterApi;

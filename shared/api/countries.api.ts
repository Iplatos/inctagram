import { 
  CountriesApiResponse,
  CountryWithFlagApiData,
} from '@/features/accounts/edit/profile-form/pofile-form-types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countriesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://countriesnow.space/api/v0.1/countries/',
  }),
  endpoints: build => {
    return {
      getCities: build.query<CountriesApiResponse<string[]>, string>({
        query: country => {
          return {
            body: { country },
            method: 'POST',
            url: 'cities',
          };
        },
      }),
      getCountries: build.query<CountriesApiResponse<CountryWithFlagApiData[]>, void>({
        query: () => {
          return {
            method: 'GET',
            url: 'flag/unicode',
          };
        },
      }),
    };
  },
  reducerPath: 'countriesApi',
});

export const { useGetCitiesQuery, useGetCountriesQuery } = countriesApi;

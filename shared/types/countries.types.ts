export type CountriesApiResponse<T> = {
  data: T;
  error: boolean;
  msg: string;
};

export type CountryWithFlagApiData = {
  iso2: string;
  iso3: string;
  name: string;
  unicodeFlag: string;
};
